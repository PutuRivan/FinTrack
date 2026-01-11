"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInWithPassword } from "@/lib/actions";
import { type LoginSchema, loginSchema } from "@/lib/schema";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await signInWithPassword(formData);
    console.log(response);
  });

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            {...register("email")}
          />
          {errors.email && (
            <FieldDescription className="text-destructive">
              {errors.email?.message}
            </FieldDescription>
          )}
        </Field>
        {/* Password */}
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="/auth/reset-password"
              className="text-primary text-sm font-medium hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            {...register("password")}
          />
          {errors.password && (
            <FieldDescription className="text-destructive">
              {errors.password.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in to FinTrack"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
