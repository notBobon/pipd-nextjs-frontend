import SettingsTabs from "@/components/settings/SettingsTabs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Settings() {
  return (
    <div>
      <div className="rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] py-5 lg:py-6">
          
          <SettingsTabs />
          
        </div>
    </div>
  );
}
