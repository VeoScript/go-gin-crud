"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Blog() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
}
