import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import Logo from "./Logo";
import type { NavigationItem } from "./types";
import { useState } from "react";

interface MobileNavProps {
  items: NavigationItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const handleNavigation = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-muted"
          aria-label="Open navigation menu"
        >
          <Menu className="size-6" />
        </SheetTrigger>

        <SheetContent side="left" className="w-80">
          <div className="mb-8">
            <Logo />
          </div>

          <nav className="flex flex-col gap-2">
            {items.map(({ href, title }) => (
              <NavLink
                key={href}
                to={href}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-4 py-3 font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  ].join(" ")
                }
              >
                {title}
              </NavLink>
            ))}
          </nav>

          {/* Login & Register */}
          <div className="mt-8 flex flex-col gap-2 border-t pt-4">
            <NavLink
              to={"/login"}
              onClick={handleNavigation}
              className="rounded-lg px-4 py-3 font-medium transition-colors"
            >
              Login
            </NavLink>

            <NavLink
              to={"/register"}
              onClick={handleNavigation}
              className="rounded-lg px-4 py-3 font-medium transition-colors"
            >
              Register
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
