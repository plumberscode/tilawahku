"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function GoogleOneTap() {
  const router = useRouter();

  useEffect(() => {
    // Only attempt if running in browser
    if (typeof window === "undefined") return;

    authClient
      .oneTap({
        callbackURL: "/dashboard",
        autoSelect: true,
        context: "signin",
      })
      .then(() => {
        router.push("/dashboard");
        router.refresh();
      })
      .catch((err) => {
        // One Tap dismissed, skipped, or not configured. This is normal and expected.
        console.debug("Google One Tap notice:", err);
      });
  }, [router]);

  return null;
}
