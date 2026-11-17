// src/features/analytics/components/TopProductsAnalyticsTable.tsx

import type { TopProductAnalytics } from "../types/analytics.type";

interface TopProductsAnalyticsTableProps {
  products: TopProductAnalytics[];
}

const formatCurrency = (amountInMinorUnits: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountInMinorUnits);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-IN").format(value);
};

export const TopProductsAnalyticsTable = ({
  products,
}: TopProductsAnalyticsTableProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No product sales found for the selected period.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left font-medium">Rank</th>

              <th className="px-4 py-3 text-left font-medium">Product</th>

              <th className="px-4 py-3 text-right font-medium">
                Quantity Sold
              </th>

              <th className="px-4 py-3 text-right font-medium">Orders</th>

              <th className="px-4 py-3 text-right font-medium">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product.productId} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">#{index + 1}</td>

                <td className="px-4 py-3">
                  <div className="max-w-xs truncate font-medium">
                    {product.productName}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    ID: {product.productId}
                  </div>
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(product.totalQuantitySold)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(product.totalOrders)}
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  {formatCurrency(product.totalRevenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
