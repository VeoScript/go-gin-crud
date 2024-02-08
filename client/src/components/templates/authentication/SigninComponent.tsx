"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";
import AuthLayout from "~/components/layouts/AuthLayout";

import { toast } from "sonner";
import { signinValidation } from "~/helpers/hooks/useValidations";
import { useSignInMutation } from "~/helpers/tanstack/mutations/auth";

function SigninComponent() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [signInFormErrors, setSignInFormErrors] = useState<any>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signinMutation = useSignInMutation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signinValidation.validate(
        { email, password },
        { abortEarly: false }
      );

      setIsSubmitting(true);

      await signinMutation.mutateAsync(
        {
          email,
          password,
        },
        {
          onError: (error: any) => {
            setIsSubmitting(false);
            toast.error(error?.response?.data?.message);
          },
          onSuccess: () => {
            setIsSubmitting(false);
            setEmail("");
            setPassword("");
            router.push("/");
          },
        }
      );
    } catch (error: any) {
      if (error?.inner) {
        const errors: any = {};
        error.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
        setSignInFormErrors(errors);
      }
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col items-center w-full max-w-xl gap-y-3"
      >
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="email" className="ml-1 text-sm">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
            value={email}
            onChange={(e) => {
              setSignInFormErrors([]);
              setEmail(e.currentTarget.value);
            }}
          />
          {signInFormErrors && signInFormErrors.email && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {signInFormErrors.email}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="password" className="ml-1 text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
            value={password}
            onChange={(e) => {
              setSignInFormErrors([]);
              setPassword(e.currentTarget.value);
            }}
          />
          {signInFormErrors && signInFormErrors.password && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {signInFormErrors.password}
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={clsx(
            isSubmitting && "opacity-50",
            "w-full p-3 outline-none rounded-xl border border-blue-400 text-white bg-blue-400 hover:opacity-50"
          )}
        >
          Sign in
        </button>
        <Link href="/signup" className="text-sm hover:underline">
          Don&apos;t have an account?
        </Link>
      </form>
    </AuthLayout>
  );
}

export default memo(SigninComponent);
