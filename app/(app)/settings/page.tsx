"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import {
  AlertCircle,
  ExternalLink,
  KeyRound,
  Loader2,
  LogOut,
  Shield,
  Smartphone,
  Trash2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Schema ─────────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});
type ProfileFormData = z.infer<typeof profileSchema>;

// ── Nav config ─────────────────────────────────────────────────────────────────

type Section = "profile" | "security" | "danger";

const SECTIONS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "danger", label: "Danger Zone", icon: Trash2 },
];

const PLAN_BADGE: Record<string, "default" | "secondary" | "outline"> = {
  free: "outline",
  basic: "secondary",
  pro: "default",
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { user, subscription, updateProfile, logout } = useAuth();
  const [active, setActive] = useState<Section>("profile");

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.email?.[0]?.toUpperCase() ?? "?";

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name}`.trim()
    : user?.email ?? "";

  return (
    <div className="max-w-4xl space-y-8">
      {/* ── Profile hero ── */}
      <div className="flex items-center gap-5 rounded-xl border bg-card p-6">
        <Avatar className="size-16 shrink-0">
          <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-lg font-semibold truncate">
              {displayName || "Your Account"}
            </h2>
            {subscription && (
              <Badge
                variant={PLAN_BADGE[subscription.plan] ?? "outline"}
                className="capitalize shrink-0"
              >
                {subscription.plan}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {user?.email}
          </p>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
        {/* Left nav */}
        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-1 md:pb-0 md:sticky md:top-20">
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isDanger = id === "danger";
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors shrink-0 md:w-full text-left",
                  isActive && !isDanger && "bg-primary/10 text-primary",
                  !isActive && !isDanger &&
                    "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  isActive && isDanger && "bg-destructive/10 text-destructive",
                  !isActive && isDanger &&
                    "text-destructive/60 hover:text-destructive hover:bg-destructive/5",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right content */}
        <div>
          {active === "profile" && (
            <ProfileSection
              user={user}
              updateProfile={updateProfile}
              initials={initials}
            />
          )}
          {active === "security" && <SecuritySection />}
          {active === "danger" && <DangerSection logout={logout} />}
        </div>
      </div>
    </div>
  );
}

// ── Profile section ────────────────────────────────────────────────────────────

function ProfileSection({
  user,
  updateProfile,
  initials,
}: {
  user: ReturnType<typeof useAuth>["user"];
  updateProfile: ReturnType<typeof useAuth>["updateProfile"];
  initials: string;
}) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { first_name: "", last_name: "" },
  });

  useEffect(() => {
    if (user) {
      form.reset({ first_name: user.first_name, last_name: user.last_name });
    }
  }, [user, form]);

  return (
    <SectionCard title="Profile" description="Update your personal information.">
      {/* Avatar row */}
      <div className="flex items-center gap-4 pb-5 border-b">
        <Avatar className="size-14 shrink-0">
          <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Profile picture</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Generated from your initials.{" "}
            <a
              href="https://accounts.clerk.com/user"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              Upload a photo in Clerk
              <ExternalLink className="size-2.5" />
            </a>
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={form.handleSubmit((d) => updateProfile.mutate(d))}
        className="space-y-4 pt-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="email_display">Email address</Label>
          <Input
            id="email_display"
            value={user?.email ?? ""}
            disabled
            className="text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed here.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="first_name">First name</Label>
            <Input
              id="first_name"
              aria-invalid={!!form.formState.errors.first_name}
              disabled={updateProfile.isPending}
              {...form.register("first_name")}
            />
            {form.formState.errors.first_name && (
              <FieldError message={form.formState.errors.first_name.message!} />
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              id="last_name"
              aria-invalid={!!form.formState.errors.last_name}
              disabled={updateProfile.isPending}
              {...form.register("last_name")}
            />
            {form.formState.errors.last_name && (
              <FieldError message={form.formState.errors.last_name.message!} />
            )}
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            size="sm"
            disabled={updateProfile.isPending || !form.formState.isDirty}
          >
            {updateProfile.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Save changes
          </Button>
        </div>
      </form>
    </SectionCard>
  );
}

// ── Security section ───────────────────────────────────────────────────────────

function SecuritySection() {
  return (
    <SectionCard
      title="Security"
      description="Manage your password and authentication methods."
    >
      <div className="divide-y">
        <SecurityRow
          icon={<KeyRound className="size-4 text-muted-foreground" />}
          label="Password"
          value="••••••••••••"
          hint="Change or reset via Clerk"
        />
        <SecurityRow
          icon={<Smartphone className="size-4 text-muted-foreground" />}
          label="Two-factor authentication"
          value="Managed by Clerk"
          hint="Add an extra layer of protection"
        />
        <SecurityRow
          icon={<LogOut className="size-4 text-muted-foreground" />}
          label="Active sessions"
          value="Current device"
          hint="View and revoke sessions in Clerk"
        />
      </div>

      <div className="pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open("https://accounts.clerk.com/user", "_blank")
          }
        >
          <ExternalLink className="size-4" />
          Manage account security
        </Button>
      </div>
    </SectionCard>
  );
}

function SecurityRow({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3.5">
      <div className="flex size-8 items-center justify-center rounded-lg bg-muted shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
      </div>
      <span className="text-sm text-muted-foreground font-mono shrink-0">
        {value}
      </span>
    </div>
  );
}

// ── Danger section ─────────────────────────────────────────────────────────────

function DangerSection({ logout }: { logout: () => void }) {
  return (
    <div className="rounded-xl border border-destructive/30 overflow-hidden">
      <div className="px-5 py-4 border-b border-destructive/20 bg-destructive/5">
        <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          These actions are permanent and cannot be undone.
        </p>
      </div>
      <div className="divide-y divide-destructive/10">
        <DangerRow
          title="Sign out everywhere"
          description="End all active sessions across every device and browser."
          action={
            <Button variant="destructive" size="sm" onClick={logout}>
              <LogOut className="size-4" />
              Sign out everywhere
            </Button>
          }
        />
        <DangerRow
          title="Delete account"
          description="Permanently delete your account and all data. This cannot be undone."
          action={
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                window.open("https://accounts.clerk.com/user", "_blank")
              }
            >
              <Trash2 className="size-4" />
              Delete account
            </Button>
          }
        />
      </div>
    </div>
  );
}

function DangerRow({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 p-5">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-l-2 border-l-primary/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="text-xs text-destructive flex items-center gap-1">
      <AlertCircle className="size-3 shrink-0" />
      {message}
    </p>
  );
}
