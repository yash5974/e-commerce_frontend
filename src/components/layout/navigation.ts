import { BarChart3, Info, Package, ShoppingBag, User } from "lucide-react";
import type { NavigationItem } from "./types";

/**
 * Public / Guest Navigation
 *
 * Routes available without authentication.
 */
export const publicNavigation: NavigationItem[] = [
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
  },
];

/**
 * Authenticated User Navigation
 *
 * Public routes remain accessible to the user,
 * plus user-specific protected routes.
 */
export const userNavigation: NavigationItem[] = [
  ...publicNavigation,
  {
    title: "Orders",
    href: "/orders",
    icon: Package,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

/**
 * Admin Navigation
 *
 * Only routes that actually exist under AdminRoute.
 */
export const adminNavigation: NavigationItem[] = [
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
  {
    title: "Sales",
    href: "/admin/analytics/sales",
    icon: BarChart3,
  },
  {
    title: "Revenue",
    href: "/admin/analytics/revenue",
    icon: BarChart3,
  },
  {
    title: "Top Products",
    href: "/admin/analytics/top-products",
    icon: BarChart3,
  },
];
