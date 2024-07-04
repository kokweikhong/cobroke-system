"use client";

import { signIn } from "@/actions/auth";
// import { useFormState } from "react-dom";
import { KeyRoundIcon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import ErrorMessageCard from "@/components/error-message-card";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [state, formAction] = useFormState(signIn, {
    message: "",
  });
  const searchParams = useSearchParams();
  const errMessage = searchParams.get("message");
  return (
    <div className="mt-10 flex min-h-full flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <Link href="/">
            <Image
              src={logo}
              alt="Cobroke System"
              className="mx-auto h-10 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div>
          {state?.message && (
            <ErrorMessageCard>
              <p>{state.message}</p>
            </ErrorMessageCard>
          )}
          {errMessage && (
            <ErrorMessageCard>
              <p className="mb-4">{errMessage}</p>
              <Link
                href={"/admin/dashboard"}
                className="text-primary hover:text-primary/90"
              >
                Go to dashboard
              </Link>
            </ErrorMessageCard>
          )}
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={cn(
                    "block w-full border-b py-1.5 pl-10 text-gray-900 placeholder:text-gray-400",
                    "sm:text-sm sm:leading-6",
                    "transition-all duration-200 ease-in-out",
                    "focus:outline-none focus:border-primary"
                  )}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRoundIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={cn(
                    "block w-full border-b py-1.5 pl-10 text-gray-900 placeholder:text-gray-400",
                    "sm:text-sm sm:leading-6",
                    "transition-all duration-200 ease-in-out",
                    "focus:outline-none focus:border-primary"
                  )}
                  placeholder="your secret password"
                  required
                />
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center">
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </div>
        <p className="text-center text-sm leading-6 text-gray-500">
          Not a member?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-primary hover:text-primary/90"
          >
            Start a 14-day free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
