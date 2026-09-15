import {
  CircleDollarSign,
  Clock3,
  PackageCheck,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";

import type { SalesAnalytics } from "../types/analytics.type";

interface SalesAnalyticsCardsProps {
  analytics: SalesAnalytics;
}

const formatCurrency = (amountInMinorUnits: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountInMinorUnits / 100);
};

const cards = [
  {
    key: "totalSales",
    label: "Total Sales",
    icon: CircleDollarSign,
    getValue: (data: SalesAnalytics) => formatCurrency(data.totalSales),
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: ShoppingCart,
    getValue: (data: SalesAnalytics) =>
      data.totalOrders.toLocaleString("en-IN"),
  },
  {
    key: "averageOrderValue",
    label: "Average Order Value",
    icon: CircleDollarSign,
    getValue: (data: SalesAnalytics) => formatCurrency(data.averageOrderValue),
  },
  {
    key: "paidOrders",
    label: "Paid Orders",
    icon: PackageCheck,
    getValue: (data: SalesAnalytics) => data.paidOrders.toLocaleString("en-IN"),
  },
  {
    key: "pendingOrders",
    label: "Pending Orders",
    icon: Clock3,
    getValue: (data: SalesAnalytics) =>
      data.pendingOrders.toLocaleString("en-IN"),
  },
  {
    key: "shippedOrders",
    label: "Shipped Orders",
    icon: Truck,
    getValue: (data: SalesAnalytics) =>
      data.shippedOrders.toLocaleString("en-IN"),
  },
  {
    key: "failedOrders",
    label: "Failed Orders",
    icon: XCircle,
    getValue: (data: SalesAnalytics) =>
      data.failedOrders.toLocaleString("en-IN"),
  },
] as const;

export const SalesAnalyticsCards = ({
  analytics,
}: SalesAnalyticsCardsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.key} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>

              <Icon className="size-5 text-muted-foreground" />
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {card.getValue(analytics)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
