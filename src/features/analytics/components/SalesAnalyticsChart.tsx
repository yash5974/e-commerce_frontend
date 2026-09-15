import ReactECharts from "echarts-for-react";

import type { SalesAnalytics } from "../types/analytics.type";

interface SalesAnalyticsChartProps {
  analytics: SalesAnalytics;
}

export const SalesAnalyticsChart = ({
  analytics,
}: SalesAnalyticsChartProps) => {
  const option = {
    tooltip: {
      trigger: "item",
    },

    legend: {
      bottom: 0,
    },

    series: [
      {
        name: "Orders",
        type: "pie",
        radius: ["45%", "70%"],

        avoidLabelOverlap: true,

        itemStyle: {
          borderRadius: 6,
          borderColor: "#fff",
          borderWidth: 2,
        },

        label: {
          show: false,
        },

        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },

        data: [
          {
            value: analytics.paidOrders,
            name: "Paid",
          },
          {
            value: analytics.pendingOrders,
            name: "Pending",
          },
          {
            value: analytics.failedOrders,
            name: "Failed",
          },
          {
            value: analytics.shippedOrders,
            name: "Shipped",
          },
        ],
      },
    ],
  };

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold">Order Status Distribution</h2>

        <p className="text-sm text-muted-foreground">
          Distribution of orders by their current status.
        </p>
      </div>

      <ReactECharts
        option={option}
        style={{ height: 360, width: "100%" }}
        notMerge
        lazyUpdate
      />
    </div>
  );
};
