import { Bell, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { selectCartItemCount } from "@/features/cart";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/ui/button";
import { getUserRole } from "@/utils/helpers";

import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

import {
  adminNavigation,
  publicNavigation,
  userNavigation,
} from "./navigation";

import type { HeaderVariant } from "./types";

interface HeaderProps {
  variant?: HeaderVariant;
}

export default function Header({ variant = "PUBLIC" }: HeaderProps) {
  const navigate = useNavigate();

  const cartItemCount = useAppSelector(selectCartItemCount);

  const { isAuthenticated, role } = getUserRole();

  const isAuthHeader = variant === "AUTH";
  const isAdmin = isAuthenticated && role === "ADMIN";
  const isUser = isAuthenticated && role === "USER";

  const navigation = useMemo(() => {
    if (isAuthHeader) {
      return [];
    }

    if (isAdmin) {
      return adminNavigation;
    }

    if (isUser) {
      return userNavigation;
    }

    return publicNavigation;
  }, [isAuthHeader, isAdmin, isUser]);

  const mobileNavigation = isAuthHeader ? publicNavigation : navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl">
      <div
        className="
          mx-auto
          grid
          h-16
          max-w-7xl
          grid-cols-[auto_1fr_auto]
          items-center
          gap-4
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-2">
          <MobileNav
            items={mobileNavigation}
            isAuthenticated={isAuthHeader ? false : isAuthenticated}
          />
          <Logo />
        </div>

        {/* CENTER */}
        {!isAuthHeader && (
          <div className="hidden min-w-0 justify-center lg:flex">
            <DesktopNav items={navigation} />
          </div>
        )}

        {/* RIGHT */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          {/* USER ONLY */}
          {isUser && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="relative shrink-0"
                aria-label="Notifications"
              >
                <Bell className="size-5" />

                <span
                  className="
                    absolute
                    right-1.5
                    top-1.5
                    size-2
                    rounded-full
                    bg-red-500
                  "
                />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="relative shrink-0"
                aria-label="Shopping cart"
              >
                <Link to="/cart">
                  <ShoppingCart className="size-5" />

                  {cartItemCount > 0 && (
                    <span
                      className="
                        absolute
                        -right-1
                        -top-1
                        flex
                        size-5
                        items-center
                        justify-center
                        rounded-full
                        bg-primary
                        text-[10px]
                        font-medium
                        text-primary-foreground
                      "
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </Button>

              <UserMenu />
            </>
          )}

          {/* ADMIN ONLY */}
          {isAdmin && <UserMenu />}

          {/* OPEN / GUEST ONLY */}
          {!isAuthHeader && !isAuthenticated && (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                type="button"
                className="shrink-0"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
