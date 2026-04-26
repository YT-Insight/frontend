"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle, Loader2 } from "lucide-react";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();

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
          <CardTitle className="text-base">Security</CardTitle>
          <CardDescription className="text-sm">
            Manage your password and connected accounts via your Clerk profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open("https://accounts.clerk.com/user", "_blank")}
          >
            Manage account security
          </Button>
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

