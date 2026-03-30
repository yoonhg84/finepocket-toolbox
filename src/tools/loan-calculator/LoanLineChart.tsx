"use client";

import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
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
import type { AmortizationRow } from "./logic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface LoanLineChartProps {
  schedule: AmortizationRow[];
}

export default function LoanLineChart({ schedule }: LoanLineChartProps) {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  // Downsample for large schedules
  const step = schedule.length > 120 ? Math.ceil(schedule.length / 60) : 1;
  const sampled = schedule.filter((_, i) => i % step === 0 || i === schedule.length - 1);

  const data = {
    labels: sampled.map((r) => `${r.month}`),
    datasets: [
      {
        label: ui("Remaining Balance"),
        data: sampled.map((r) => r.balance),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#d1d5db" : "#374151";
  const gridColor = isDark ? "rgba(75, 85, 99, 0.4)" : "rgba(209, 213, 219, 0.8)";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: textColor },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) => {
            const val = ctx.raw as number;
            return `${ui("Balance")}: ${val.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: ui("Month"), color: textColor },
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        title: { display: true, text: ui("Balance"), color: textColor },
        ticks: { color: textColor },
        grid: { color: gridColor },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
}
