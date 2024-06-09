"use client";

import Login from "@/components/Login";
import { useUserStore } from "@/providers/user";

export default function IdeasPage() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Login />;
  }

  return <div>IdeasPage</div>;
}
