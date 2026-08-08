import {
  Home,
  ShoppingBag,
  LayoutGrid,
  Phone,
  Info,
  User,
  Shield,
} from "lucide-react";

import type { NavigationItem } from "./types";

export const publicNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: LayoutGrid,
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
  },
];

export const userNavigation: NavigationItem[] = [
  ...publicNavigation,
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: User,
  },
];

export const adminNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Shield,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: LayoutGrid,
  },
];
