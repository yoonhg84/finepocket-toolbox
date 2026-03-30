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
  // Downsample for large schedules
  const step = schedule.length > 120 ? Math.ceil(schedule.length / 60) : 1;
  const sampled = schedule.filter((_, i) => i % step === 0 || i === schedule.length - 1);

  const data = {
    labels: sampled.map((r) => `${r.month}`),
    datasets: [
      {
        label: "Remaining Balance",
        data: sampled.map((r) => r.balance),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) => {
            const val = ctx.raw as number;
            return `Balance: ${val.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Month" },
      },
      y: {
        title: { display: true, text: "Balance" },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
