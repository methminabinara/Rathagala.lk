"use client";

import React, { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import {
  signupSchema,
  type SignupSchemaT
} from "@/features/auth/schemas/signup-schema";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleAuthButton } from "./google-auth-button";
import { GithubAuthButton } from "./github-auth-button";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";

type Props = {
  className?: string;
};

export function SignupForm({ className }: Props) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const toastId = useId();

  const form = useForm<SignupSchemaT>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function handleFormSubmit(formData: SignupSchemaT) {
    setIsPending(true);

    await authClient.signUp.email(
      {
        email: formData.email,
        name: formData.name,
        password: formData.password
      },
      {
        onRequest: () => {
          toast.loading("Signing up...", { id: toastId });
        },
        onSuccess: () => {
          toast.success("Successfully Signed Up!", {
            id: toastId,
            description:
              "Your account has been created !, Check your email for verification link."
          });

          form.reset();
          redirect("/signin");
        },
        onError: (ctx) => {
          toast.error("Signup failed !", {
            id: toastId,
            description: ctx.error.message || "Something went wrong"
          });
        }
      }
    );

    setIsPending(false);
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="John R. Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isPending}
                    placeholder="***********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isPending}
                    placeholder="***********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" loading={isPending}>
            Signup
          </Button>
        </form>
      </Form>

      {/* Option texts */}
      <div className="flex items-center text-center justify-between">
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/signin"}>Already have an account ? Sign In</Link>
        </Button>
      </div>

      <Separator />

      {/* Auth Provider Buttons */}
      <div className="flex flex-col space-y-4 mb-5">
        <GoogleAuthButton mode="signup" />
        <GithubAuthButton mode="signup" />
      </div>

      <div className="mb-5">
        <p className="text-sm text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <Link href={"/terms"} className="hover:underline" target="_blank">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"/privacy"} className="hover:underline" target="_blank">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
