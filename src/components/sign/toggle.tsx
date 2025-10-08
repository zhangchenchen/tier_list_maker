"use client";

import SignIn from "./sign_in";
import User from "./user";
import { useAppContext } from "@/contexts/app";
import { isAuthEnabled } from "@/lib/auth";

export default function SignToggle() {
  const { user } = useAppContext();

  if (!isAuthEnabled()) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 px-2 cursor-pointer">
      {user ? <User user={user} /> : <SignIn />}
    </div>
  );
}
