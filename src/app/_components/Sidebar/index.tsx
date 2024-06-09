"use client";

import { BellIcon, DocumentIcon, LightBulbIcon } from "@/components/iconSVG";
import { useUiStore } from "@/providers/ui-store-provider";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarExpanded = useUiStore((state) => state.sidebarExpanded);
  return (
    <aside className="p-3 w-fit h-full shadow-lg">
      <nav
        className={clsx("h-full flex flex-col transition-all", {
          "w-12": !sidebarExpanded,
          "w-52": sidebarExpanded,
        })}
      >
        <div className="text-xs">I{sidebarExpanded && "nput"}</div>
        <NavItem
          path="/"
          title="Notes"
          icon={<DocumentIcon className="shrink-0 w-6 h-6 stroke-black" />}
          active={pathname === "/"}
          sidebarExpanded={sidebarExpanded}
        />
        <div className="my-3"></div>
        <div className="text-xs">O{sidebarExpanded && "utput"}</div>
        <NavItem
          path="/reminders"
          title="Reminders"
          icon={<BellIcon className="shrink-0 w-6 h-6 stroke-black" />}
          active={pathname === "/reminders"}
          sidebarExpanded={sidebarExpanded}
        />
        <NavItem
          path="/ideas"
          title="Ideas"
          icon={<LightBulbIcon className="shrink-0 w-6 h-6 stroke-black" />}
          active={pathname === "/ideas"}
          sidebarExpanded={sidebarExpanded}
        />
      </nav>
    </aside>
  );
}
