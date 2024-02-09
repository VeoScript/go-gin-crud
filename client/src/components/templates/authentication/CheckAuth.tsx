"use client";

import { useEffect } from "react";
import { authStore } from "~/helpers/store/auth";
import { useGetUser } from "~/helpers/tanstack/queries/users";

export default function CheckAuth({ hasCookies }: { hasCookies: any }) {
  const { setIsAuth, setUserId } = authStore();

  const { data: user } = useGetUser();

  useEffect(() => {
    setIsAuth(hasCookies);
    return () => {};
  }, [hasCookies, setIsAuth]);

  useEffect(() => {
    if (user) {
      setUserId(user?.ID ?? null);
    }
  }, [setUserId, user]);

  return <></>;
}
