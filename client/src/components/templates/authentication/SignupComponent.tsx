"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";
import AuthLayout from "~/components/layouts/AuthLayout";

import { toast } from "sonner";
import { signupValidation } from "~/helpers/hooks/useValidations";
import { useSignUpMutation } from "~/helpers/tanstack/mutations/auth";

function SignupComponent() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [signUpFormErrors, setSignUpFormErrors] = useState<any>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const signupMutation = useSignUpMutation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signupValidation.validate(
        { name, email, password, repassword },
        { abortEarly: false }
      );

      setIsSubmitting(true);

      await signupMutation.mutateAsync(
        {
          name,
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
            setName("");
            setEmail("");
            setPassword("");
            setRepassword("");
            router.refresh();
          },
        }
      );
    } catch (error: any) {
      if (error?.inner) {
        const errors: any = {};
        error.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
        setSignUpFormErrors(errors);
      }
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col items-center w-full max-w-xl gap-y-3"
      >
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="name" className="ml-1 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
            value={name}
            onChange={(e) => {
              setSignUpFormErrors([]);
              setName(e.currentTarget.value);
            }}
          />
          {signUpFormErrors && signUpFormErrors.name && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {signUpFormErrors.name}
            </span>
          )}
        </div>
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
              setSignUpFormErrors([]);
              setEmail(e.currentTarget.value);
            }}
          />
          {signUpFormErrors && signUpFormErrors.email && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {signUpFormErrors.email}
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
              setSignUpFormErrors([]);
              setPassword(e.currentTarget.value);
            }}
          />
          {signUpFormErrors && signUpFormErrors.password && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {signUpFormErrors.password}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="repassword" className="ml-1 text-sm">
            Re-enter Password
          </label>
          <input
            type="password"
            id="repassword"
            className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
            value={repassword}
            onChange={(e) => {
              setSignUpFormErrors([]);
              setRepassword(e.currentTarget.value);
            }}
          />
          {signUpFormErrors && signUpFormErrors.repassword && (
            <span className="ml-2 mt-1 text-xs font-medium text-red-500">
              {signUpFormErrors.repassword}
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
          Sign up
        </button>
        <Link href="/signin" className="text-sm hover:underline">
          Already have an account?
        </Link>
      </form>
    </AuthLayout>
  );
}

export default memo(SignupComponent);
