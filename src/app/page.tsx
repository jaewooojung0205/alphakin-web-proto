"use client";

import NewNote from "./_components/NewNote";
import NotClassifiedNoteList from "./_components/NotClassifiedNoteList";
import { useUserStore } from "@/providers/user";
import Login from "@/components/Login";

export default function Home() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="pt-10 flex flex-col items-center">
      <NewNote userId={user.id} />
      <NotClassifiedNoteList />
    </div>
  );
}
