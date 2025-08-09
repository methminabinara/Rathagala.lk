import React from "react";

import { Logo } from "@/components/logo";
import { SigninForm } from "@/features/auth/components/signin-form";

export default function LoginPage() {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <Logo />
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-3xl font-bold tracking-tight font-heading">
          Welcome Back!
        </h1>
        <p className="text-base text-muted-foreground">
          Sign in to your account
        </p>
      </div>
      <div className="max-w-xl w-[350px] mx-auto">
        <SigninForm />
      </div>
    </div>
  );
}
