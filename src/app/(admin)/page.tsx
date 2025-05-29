import type { Metadata } from "next";

import React from "react";
import AnnouncementCard from '@/components/ecommerce/AnnouncementCard';
import CalendarCard from "@/components/ecommerce/CalendarCard";
import { DashboardCharts } from "@/components/ecommerce/DashboardCharts";
import ComplienceCard from "@/components/ecommerce/ComplienceCard";
import UpcomingEvents from "@/components/ecommerce/UpcomingEvents";
import RecentActivites from "@/components/ecommerce/RecentActivites";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="flex flex-col items-left justify-between gap-3 mb-6">
      <div className="flex-col items-center">
        <h2
          className="text-2xl font-semibold text-gray-800 dark:text-white/90 pl-6"
          x-text="pageName"
        >
          Hi, Learner👋
        </h2>
        <h2
          className="text-title-md font-bold text-gray-800 dark:text-white/90 pl-6"
          x-text="pageName"
        >
          Welcome to PIPD!
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 xl:col-span-7">
          <AnnouncementCard />
        </div>

        <div className="col-span-12 xl:flex xl:col-span-5">
          <CalendarCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <DashboardCharts />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ComplienceCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <UpcomingEvents />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <RecentActivites />
        </div>
      </div>
    </div>
  );
}
