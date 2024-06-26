"use client";

import Login from "@/components/Login";
import { useUserStore } from "@/providers/user";

export default function RemindersPage() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Login />;
  }
  return <div>RemindersPage</div>;
}
