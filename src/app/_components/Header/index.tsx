"use client";

import { Bar3Icon } from "@/components/iconSVG";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCommonStore } from "@/providers/common";
import User from "./User";
import { useUserStore } from "@/providers/user";

function Title() {
  const pathname = usePathname();
  if (pathname === "/") {
    return <div>New note</div>;
  } else if (pathname === "/reminders") {
    return <div>Reminders</div>;
  } else if (pathname === "/ideas") {
    return <div>Ideas</div>;
  } else {
    return <div>Alphakin</div>;
  }
}

export default function Header() {
  const toggleSidebar = useCommonStore((state) => state.toggleSidebar);
  const user = useUserStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <header className="p-3 h-14 flex justify-between items-center border-b-2">
      <div className="flex items-center gap-3">
        <button
          className={clsx(
            "p-3 flex gap-5 bg-black rounded-full bg-opacity-0 hover:bg-opacity-5"
          )}
          onClick={toggleSidebar}
        >
          <Bar3Icon className="w-6 h-6 stroke-black" />
        </button>
        <Title />
      </div>
      <User />
    </header>
  );
}
