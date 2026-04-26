"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

const passwordSchema = z
  .object({
    old_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "New password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { user, updateProfile, changePassword } = useAuth();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { first_name: "", last_name: "" },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, profileForm]);

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="space-y-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription className="text-sm">
            Update your name. Your email cannot be changed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit((d) => updateProfile.mutate(d))}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email_display">Email</Label>
              <Input
                id="email_display"
                value={user?.email ?? ""}
                disabled
                className="text-muted-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  aria-invalid={!!profileForm.formState.errors.first_name}
                  disabled={updateProfile.isPending}
                  {...profileForm.register("first_name")}
                />
                {profileForm.formState.errors.first_name && (
                  <FieldError message={profileForm.formState.errors.first_name.message!} />
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  id="last_name"
                  aria-invalid={!!profileForm.formState.errors.last_name}
                  disabled={updateProfile.isPending}
                  {...profileForm.register("last_name")}
                />
                {profileForm.formState.errors.last_name && (
                  <FieldError message={profileForm.formState.errors.last_name.message!} />
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="sm"
              disabled={updateProfile.isPending || !profileForm.formState.isDirty}
            >
              {updateProfile.isPending && <Loader2 className="size-4 animate-spin" />}
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change password</CardTitle>
          <CardDescription className="text-sm">
            You&apos;ll be signed out after changing your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit((d) =>
              changePassword.mutate({
                old_password: d.old_password,
                new_password: d.new_password,
              })
            )}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="old_password">Current password</Label>
              <div className="relative">
                <Input
                  id="old_password"
                  type={showOld ? "text" : "password"}
                  className="pr-10"
                  aria-invalid={!!passwordForm.formState.errors.old_password}
                  disabled={changePassword.isPending}
                  {...passwordForm.register("old_password")}
                />
                <ToggleVisibility show={showOld} onToggle={() => setShowOld((p) => !p)} />
              </div>
              {passwordForm.formState.errors.old_password && (
                <FieldError message={passwordForm.formState.errors.old_password.message!} />
              )}
            </div>

            <Separator />

            <div className="space-y-1.5">
              <Label htmlFor="new_password">New password</Label>
              <div className="relative">
                <Input
                  id="new_password"
                  type={showNew ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="pr-10"
                  aria-invalid={!!passwordForm.formState.errors.new_password}
                  disabled={changePassword.isPending}
                  {...passwordForm.register("new_password")}
                />
                <ToggleVisibility show={showNew} onToggle={() => setShowNew((p) => !p)} />
              </div>
              {passwordForm.formState.errors.new_password && (
                <FieldError message={passwordForm.formState.errors.new_password.message!} />
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm_password">Confirm new password</Label>
              <Input
                id="confirm_password"
                type="password"
                aria-invalid={!!passwordForm.formState.errors.confirm_password}
                disabled={changePassword.isPending}
                {...passwordForm.register("confirm_password")}
              />
              {passwordForm.formState.errors.confirm_password && (
                <FieldError
                  message={passwordForm.formState.errors.confirm_password.message!}
                />
              )}
            </div>

            <Button type="submit" size="sm" variant="destructive" disabled={changePassword.isPending}>
              {changePassword.isPending && <Loader2 className="size-4 animate-spin" />}
              Change password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
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

function ToggleVisibility({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      tabIndex={-1}
    >
      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}
