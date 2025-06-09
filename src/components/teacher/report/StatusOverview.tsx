// components/StatusOverview.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface StatusData {
  name: string;
  value: number;
  color: string;
}

const rawData: StatusData[] = [
  { name: "Completed", value: 900, color: "#8BC34A" },   // green
  { name: "Not Started", value: 800, color: "#374151" }, // dark gray
  { name: "Incomplete", value: 700, color: "#FBBF24" },  // yellow
  { name: "Overdue", value: 600, color: "#EF4444" },     // red
  { name: "Exempted", value: 500, color: "#9CA3AF" },    // light gray
];

export default function StatusOverview() {
  // Compute total for percentages
  const total = rawData.reduce((sum, entry) => sum + entry.value, 0);

  // Build "data" array for Recharts bar chart: [{ name: "...", value: 900, fill: color }, ...]
  const chartData = rawData.map((entry) => ({
    name: entry.name,
    value: entry.value,
    fill: entry.color,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 w-180">
      {/* Header row: title on left, three‐dot icon on right */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base mb-2 font-semibold text-gray-800 dark:text-gray-100">
          Status Overview
        </h2>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
        />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left: Recharts BarChart */}
        <div className="w-full md:w-2/3 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 100"]}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                formatter={(value: number) => [`${value}`, "Count"]}
              />
              <Bar dataKey="value" isAnimationActive={false} barSize={30}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Legend */}
        <div className="w-full md:w-1/3 flex flex-col justify-center md:pl-6 pt-6 md:pt-0">
          {rawData.map((entry) => {
            const pct = ((entry.value / total) * 100).toFixed(2);
            return (
              <div
                key={entry.name}
                className="flex items-center mb-3 last:mb-0"
              >
                {/* Color square */}
                <div
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                {/* Label text */}
                <span className="text-xs text-gray-800 dark:text-gray-100">
                  {entry.name}: {entry.value} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
