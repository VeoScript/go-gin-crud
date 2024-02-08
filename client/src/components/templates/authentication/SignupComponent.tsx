"use client";

import { memo, useState } from "react";

import clsx from "clsx";
import AuthLayout from "~/components/layouts/AuthLayout";

import { useSignUpMutation } from "~/helpers/tanstack/mutations/auth";

function SignupComponent() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const signupMutation = useSignUpMutation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signupMutation.mutateAsync(
      {
        name,
        email,
        password,
      },
      {
        onError: () => {
          setIsSubmitting(false);
        },
        onSuccess: () => {
          setIsSubmitting(false);
          setName("");
          setEmail("");
          setPassword("");
          setRepassword("");
        },
      }
    );
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
            className="w-full p-3 outline-none rounded-xl border border-neutral-300 bg-transparent focus:border-blue-300"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="email" className="ml-1 text-sm">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-3 outline-none rounded-xl border border-neutral-300 bg-transparent focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="password" className="ml-1 text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 outline-none rounded-xl border border-neutral-300 bg-transparent focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-y-1">
          <label htmlFor="repassword" className="ml-1 text-sm">
            Re-enter Password
          </label>
          <input
            type="password"
            id="repassword"
            className="w-full p-3 outline-none rounded-xl border border-neutral-300 bg-transparent focus:border-blue-300"
            value={repassword}
            onChange={(e) => setRepassword(e.currentTarget.value)}
          />
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
      </form>
    </AuthLayout>
  );
}

export default memo(SignupComponent);
