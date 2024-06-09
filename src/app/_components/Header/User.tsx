"use client";

import { auth } from "@/lib/firebase";
import { useUserStore } from "@/providers/user";
import { signInAnonymously, signOut } from "firebase/auth";

export default function User() {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <div>user: {user.id}</div>
      <button onClick={() => signOut(auth)}>로그아웃</button>
    </div>
  );
}
