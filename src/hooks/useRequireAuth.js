"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

/**
 * @param {"parent" | "child" | "any"} requiredType
 */
export function useRequireAuth(requiredType = "any") {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // still loading

    if (!user) {
      router.replace("/login");
      return;
    }

    // Redirect home page visitors
    if (user && window.location.pathname === "/") {
      router.replace(user.accountType === "parent" ? "/dashboard" : "/learn");
      return;
    }

    if (requiredType === "parent" && user.accountType !== "parent") {
      router.replace("/learn");
      return;
    }

    if (requiredType === "child" && user.accountType !== "child") {
      router.replace("/dashboard");
      return;
    }
  }, [user, router, requiredType]);

  return user;
}
