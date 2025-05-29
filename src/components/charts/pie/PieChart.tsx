"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faNoteSticky } from "@fortawesome/free-regular-svg-icons";

// register ChartJS elements
ChartJS.register(ArcElement, Tooltip);

interface LearningTimePieChartProps {
  assessmentsTime: number; // in minutes
  modulesTime: number;     // in minutes
}

// helper to format minutes into "Xh Ym"
function formatTime(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

export default function PieChart({ assessmentsTime, modulesTime }: LearningTimePieChartProps) {
  const data = {
    labels: ["Assessments", "Modules"],
    datasets: [
      {
        data: [assessmentsTime, modulesTime],
        backgroundColor: ["#DA1A32", "#E18B9C"],
        hoverBackgroundColor: ["#AE172A", "#D76A76"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '0%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const label = ctx.label;
            const value = ctx.parsed;
            const total = assessmentsTime + modulesTime;
            const pct = ((value / total) * 100).toFixed(1);
            return `${label}: ${formatTime(value)} (${pct}%)`;
          },
        },
      },
    },
    onHover: (_, elements: any[]) => {
      document.body.style.cursor = elements.length ? 'pointer' : 'default';
    },
  };

  return (
    <div className="flex w-full h-30">
      {/* Chart Section */}
      <div className="flex-1 flex items-center justify-center w-1/2">
        <Pie data={data} options={options} />
      </div>

      {/* Custom Legend Right */}
        <div className="w-full pl-2 flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faClipboard} size="lg" className="w-6 h-6 text-gray-500 " />
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                Assessments
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(assessmentsTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faNoteSticky} size="lg" className="w-6 h-6 text-gray-500" />
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                Modules
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(modulesTime)}
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
