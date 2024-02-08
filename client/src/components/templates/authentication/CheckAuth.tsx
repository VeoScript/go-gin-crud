"use client";

import { useEffect } from "react";
import { authStore } from "~/helpers/store/auth";

export default function CheckAuth({ hasCookies }: { hasCookies: any }) {
  const { setIsAuth } = authStore();

  useEffect(() => {
    setIsAuth(hasCookies);
    return () => {};
  }, [hasCookies, setIsAuth]);

  return <></>;
}
