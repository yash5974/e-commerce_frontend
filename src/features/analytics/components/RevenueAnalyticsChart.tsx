import ReactECharts from "echarts-for-react";

import type { RevenueAnalytics } from "../types/analytics.type";

interface RevenueAnalyticsChartProps {
  analytics: RevenueAnalytics;
}

const formatCurrency = (amountInMinorUnits: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInMinorUnits / 100);
};

export const RevenueAnalyticsChart = ({
  analytics,
}: RevenueAnalyticsChartProps) => {
  const dates = analytics.dailyRevenue.map((item) => item.date);

  const revenue = analytics.dailyRevenue.map((item) => item.revenue / 100);

  const orders = analytics.dailyRevenue.map((item) => item.orders);

  const option = {
    tooltip: {
      trigger: "axis",

      formatter: (
        params: Array<{
          axisValue: string;
          seriesName: string;
          value: number;
        }>,
      ) => {
        const date = params[0]?.axisValue ?? "";

        const lines = params.map((item) => {
          if (item.seriesName === "Revenue") {
            return `${item.seriesName}: ${formatCurrency(item.value * 100)}`;
          }

          return `${item.seriesName}: ${item.value}`;
        });

        return [date, ...lines].join("<br />");
      },
    },

    legend: {
      data: ["Revenue", "Paid Orders"],
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: dates,
      boundaryGap: false,
    },

    yAxis: [
      {
        type: "value",
        name: "Revenue (₹)",
      },
      {
        type: "value",
        name: "Orders",
        minInterval: 1,
      },
    ],

    series: [
      {
        name: "Revenue",
        type: "line",
        smooth: true,
        data: revenue,

        areaStyle: {},

        emphasis: {
          focus: "series",
        },
      },
      {
        name: "Paid Orders",
        type: "bar",
        yAxisIndex: 1,
        data: orders,

        emphasis: {
          focus: "series",
        },
      },
    ],
  };

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold">Daily Revenue</h2>

        <p className="text-sm text-muted-foreground">
          Revenue and paid orders over the selected period.
        </p>
      </div>

      {analytics.dailyRevenue.length === 0 ? (
        <div className="flex h-[360px] items-center justify-center text-sm text-muted-foreground">
          No revenue data available for the selected period.
        </div>
      ) : (
        <ReactECharts
          option={option}
          style={{
            height: 360,
            width: "100%",
          }}
          notMerge
          lazyUpdate
        />
      )}
    </div>
  );
};
