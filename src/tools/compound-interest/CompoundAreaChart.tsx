"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { YearRow } from "./logic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface CompoundAreaChartProps {
  yearByYear: YearRow[];
}

export default function CompoundAreaChart({
  yearByYear,
}: CompoundAreaChartProps) {
  const data = {
    labels: yearByYear.map((r) => `Year ${r.year}`),
    datasets: [
      {
        label: "Total Invested",
        data: yearByYear.map((r) => r.totalInvested),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        order: 2,
      },
      {
        label: "Balance (Invested + Interest)",
        data: yearByYear.map((r) => r.balance),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) => {
            const val = ctx.raw as number;
            return `${ctx.dataset.label}: $${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Year" },
      },
      y: {
        title: { display: true, text: "Amount ($)" },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
