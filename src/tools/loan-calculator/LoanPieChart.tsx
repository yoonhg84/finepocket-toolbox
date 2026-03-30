"use client";

import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LoanPieChartProps {
  principal: number;
  interest: number;
}

export default function LoanPieChart({ principal, interest }: LoanPieChartProps) {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const data = {
    labels: [ui("Principal"), ui("Interest")],
    datasets: [
      {
        data: [principal, interest],
        backgroundColor: ["#3b82f6", "#ef4444"],
        borderColor: ["#2563eb", "#dc2626"],
        borderWidth: 1,
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
          label: (ctx: { label: string; raw: unknown }) => {
            const val = ctx.raw as number;
            const total = principal + interest;
            const pct = ((val / total) * 100).toFixed(1);
            return `${ctx.label}: ${val.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
