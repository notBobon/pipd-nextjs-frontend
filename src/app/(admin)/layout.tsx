"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";


  // derive page title dari pathname
  const segments = pathname.split("/").filter(Boolean);
  const raw = segments.length > 0 ? segments[segments.length - 1] : "Home";
  let pageTitle = raw
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  if (pageTitle === "Home") { pageTitle = "Dashboard" };
  if (pageTitle === "Mylearning") { pageTitle = "My Learning" };
  if (pageTitle === "Searchresults") { pageTitle = "Learning" };


  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page title bar */}

        {pageTitle !== "My Learning" && pageTitle !== "Learning" && (
          <div className="h-20 px-16 border-b bg-red-700 dark:bg-gray-800 dark:border-gray-700 flex items-center">
            <h1 className="text-title-sm font-medium text-white dark:text-white">
              {pageTitle}
            </h1>
          </div>
        )}

        {pageTitle === "My Learning" && (
          <div>
            <div className="h-25 px-16 border-b bg-red-700 text-white dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center gap-1">
              <h1 className="text-title-sm font-medium dark:text-white">
                {pageTitle}
              </h1>
              <p>
                Ongoing
              </p>
            </div>
          </div>
        )}

        {pageTitle === "Learning" && (
          <div>
            <div className="h-25 px-16 border-b bg-red-700 text-white dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center gap-1">
              <h1 className="text-title-sm font-medium dark:text-white">
                {pageTitle}
              </h1>
              <p>
                Search Results
              </p>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
