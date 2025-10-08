"use client";

import { SessionProvider } from "next-auth/react";
import { isAuthEnabled } from "@/lib/auth";

export function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthEnabled()) {
    return <>{children}</>;
  }

  return <SessionProvider>{children}</SessionProvider>;
}
