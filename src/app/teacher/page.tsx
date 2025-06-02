import type { Metadata } from "next";

import React from "react";
import DashboardStats from "@/components/ecommerce/DashboardStats";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function TeacherPage() {
  return (
    <div className="flex flex-col items-left justify-between gap-3 mb-6">
      
       <DashboardStats />

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 xl:col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <MonthlyTarget />
        </div>
      </div>
    </div>
  );
}
