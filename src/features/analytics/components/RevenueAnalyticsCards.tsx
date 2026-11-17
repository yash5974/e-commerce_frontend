import {
  CircleDollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import type { RevenueAnalytics } from "../types/analytics.type";

interface RevenueAnalyticsCardsProps {
  analytics: RevenueAnalytics;
}

const formatCurrency = (amountInMinorUnits: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountInMinorUnits);
};

export const RevenueAnalyticsCards = ({
  analytics,
}: RevenueAnalyticsCardsProps) => {
  const cards = [
    {
      label: "Total Revenue",
      value: formatCurrency(analytics.totalRevenue),
      icon: CircleDollarSign,
    },
    {
      label: "Paid Orders",
      value: analytics.totalPaidOrders.toLocaleString("en-IN"),
      icon: ShoppingCart,
    },
    {
      label: "Average Revenue / Order",
      value: formatCurrency(analytics.averageRevenuePerOrder),
      icon: CircleDollarSign,
    },
    {
      label: "Highest Order",
      value: formatCurrency(analytics.highestOrderValue),
      icon: TrendingUp,
    },
    {
      label: "Lowest Order",
      value: formatCurrency(analytics.lowestOrderValue),
      icon: TrendingDown,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>

              <Icon className="size-5 text-muted-foreground" />
            </div>

            <p className="mt-3 text-2xl font-semibold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
};
