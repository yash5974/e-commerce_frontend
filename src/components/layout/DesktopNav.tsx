import { NavLink } from "react-router-dom";

import type { NavigationItem } from "./types";

interface DesktopNavProps {
  items: NavigationItem[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
  return (
    <nav className="flex items-center gap-2">
      {items.map(({ href, title }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            [
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            ].join(" ")
          }
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
}
