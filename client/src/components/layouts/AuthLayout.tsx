"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-y-5">
      <h1 className="font-bold text-xl text-blue-500">
        {pathname === "/signin" ? "Sign In" : "Sign Up"}
      </h1>
      {children}
    </div>
  );
}

export default memo(AuthLayout);
