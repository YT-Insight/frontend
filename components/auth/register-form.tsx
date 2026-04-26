"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getFieldErrors } from "@/lib/api";

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerErrors({});
    try {
      await registerUser.mutateAsync(data);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      setServerErrors(fieldErrors);
      for (const [field, message] of Object.entries(fieldErrors)) {
        if (field in data) {
          setError(field as keyof FormData, { message });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="first_name">First name</Label>
          <Input
            id="first_name"
            placeholder="John"
            autoComplete="given-name"
            aria-invalid={!!errors.first_name}
            disabled={registerUser.isPending}
            {...register("first_name")}
          />
          {errors.first_name && <FieldError message={errors.first_name.message!} />}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="last_name">Last name</Label>
          <Input
            id="last_name"
            placeholder="Doe"
            autoComplete="family-name"
            aria-invalid={!!errors.last_name}
            disabled={registerUser.isPending}
            {...register("last_name")}
          />
          {errors.last_name && <FieldError message={errors.last_name.message!} />}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          disabled={registerUser.isPending}
          {...register("email")}
        />
        {errors.email && <FieldError message={errors.email.message!} />}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            className="pr-10"
            aria-invalid={!!errors.password}
            disabled={registerUser.isPending}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && <FieldError message={errors.password.message!} />}
      </div>

      {serverErrors.non_field_errors && (
        <FieldError message={serverErrors.non_field_errors} />
      )}

      <Button type="submit" className="w-full" disabled={registerUser.isPending}>
        {registerUser.isPending && <Loader2 className="size-4 animate-spin" />}
        {registerUser.isPending ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
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
