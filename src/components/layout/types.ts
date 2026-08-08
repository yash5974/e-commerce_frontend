import type { LucideIcon } from "lucide-react";

export type HeaderVariant = "PUBLIC" | "AUTH" | "USER" | "ADMIN";

export interface NavigationItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}
