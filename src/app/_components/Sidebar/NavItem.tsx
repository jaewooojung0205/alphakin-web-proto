import clsx from "clsx";
import Link from "next/link";

interface NavItemProps {
  path: string;
  title: string;
  icon: React.ReactNode;
  active: boolean;
  sidebarExpanded: boolean;
}

export default function NavItem(props: NavItemProps) {
  const { path, title, icon, active, sidebarExpanded } = props;
  return (
    <Link href={path}>
      <button
        className={clsx(
          "p-3 w-full flex items-center gap-5 bg-black rounded-r-full",
          {
            "bg-sky-100 bg-opacity-100": active,
            "bg-opacity-0 hover:bg-opacity-5": !active,
            "rounded-l-none": sidebarExpanded,
            "rounded-l-full": !sidebarExpanded,
          }
        )}
      >
        <div>{icon}</div>
        <div
          className={clsx("text-sm transition-opacity", {
            "opacity-100 delay-150": sidebarExpanded,
            "opacity-0 delay-0": !sidebarExpanded,
          })}
        >
          {title}
        </div>
      </button>
    </Link>
  );
}
