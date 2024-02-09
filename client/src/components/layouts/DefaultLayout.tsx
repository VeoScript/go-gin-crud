"use client";

import { memo } from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <main className="relative flex flex-grow flex-col items-center w-full h-full p-3 gap-y-3">
      {children}
    </main>
  );
}

export default memo(DefaultLayout);
