import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import CheckAuth from "~/components/templates/authentication/CheckAuth";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Go NextJS Blog",
  description: "Created by ambot sa imong lubot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasAuthCookie = cookies().has(`${process.env.COOKIE_NAME}`);
  return (
    <html lang="en">
      <Providers>
        <body className={clsx(inter.className, "text-white bg-neutral-900")}>
          <Toaster position="top-center" />
          <CheckAuth hasCookies={hasAuthCookie} />
          {children}
        </body>
      </Providers>
    </html>
  );
}
