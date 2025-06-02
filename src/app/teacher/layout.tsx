"use client";

import { useSidebar } from "@/context/SidebarContext";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { usePathname } from "next/navigation";
import TeacherHeader from "@/layout/TeacherHeader";
import TeacherSidebar from "@/layout/TeacherSidebar";
import PageBreadcrumbTeacher from "@/components/common/PageBreadCrumbTeacher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus, faPrint, faUpload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  if (pageTitle === "Teacher") { pageTitle = "Dashboard" };
  if (pageTitle === "Report") { pageTitle = "Curriculum Progress Report" };
  if (pageTitle === "Create") { pageTitle = "Create User" };


  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <TeacherSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <TeacherHeader />
        {/* Page title bar */}

        {pageTitle !== "Dashboard" && pageTitle !== "Users" && pageTitle !== "Curriculum Progress Report" && pageTitle !== "Create User" && (
          <div className="h-24 px-9 border-b bg-red-700 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <PageBreadcrumbTeacher pageTitle="" pageSubTitle="LMS" />
              <h1 className="text-2xl font-medium text-white dark:text-white">
                {pageTitle}
              </h1>
            </div>
            <p className="text-white">
              Fields Marked with * are mandatory
            </p>
          </div>
        )}

        {pageTitle === "Dashboard" && (
          <div className="h-24 px-9 border-b bg-red-700 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <PageBreadcrumbTeacher pageTitle="Home" pageSubTitle="LMS" />
              <h1 className="text-2xl font-medium text-white dark:text-white">
                {pageTitle}
              </h1>
            </div>
            <Link href="/teacher" className="inline-flex items-baseline gap-1">
              <FontAwesomeIcon icon={faDownload} size="sm" className="text-white w-5 h-5" />
              <p className="text-white text-sm">
                Download
              </p>
            </Link>
          </div>
        )}

        {pageTitle === "Users" && (
          <div className="h-24 px-9 border-b bg-red-700 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <PageBreadcrumbTeacher pageTitle="Team" pageSubTitle="Users" />
              <h1 className="text-2xl font-medium text-white dark:text-white">
                {pageTitle}
              </h1>
            </div>
            <div className="flex flex-row gap-4">
              <Link href="/teacher/users/bulk" className="inline-flex items-baseline gap-1">
                <FontAwesomeIcon icon={faUpload} size="sm" className="text-white w-5 h-5" />
                <p className="text-white text-sm">
                  Bulk Upload
                </p>
              </Link>
              <Link href="/teacher/users/create" className="inline-flex items-baseline gap-1">
                <FontAwesomeIcon icon={faPlus} size="sm" className="text-white w-5 h-5" />
                <p className="text-white text-sm">
                  Add
                </p>
              </Link>
              <Link href="/teacher/users" className="inline-flex items-baseline gap-1">
                <FontAwesomeIcon icon={faPrint} size="sm" className="text-white w-5 h-5" />
                <p className="text-white text-sm">
                  Print
                </p>
              </Link>
              <Link href="/teacher/users" className="inline-flex items-baseline gap-1">
                <FontAwesomeIcon icon={faPrint} size="sm" className="text-white w-5 h-5" />
                <p className="text-white text-sm">
                  Print All
                </p>
              </Link>
            </div>
          </div>
        )}

        {pageTitle === "Create User" && (
          <div className="h-24 px-9 border-b bg-red-700 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <PageBreadcrumbTeacher pageTitle="Team" pageSubTitle="Users" />
              <h1 className="text-2xl font-medium text-white dark:text-white">
                {pageTitle}
              </h1>
            </div>
            <p className="text-white">
              Fields Marked with * are mandatory
            </p>
          </div>
        )}

        {pageTitle === "Curriculum Progress Report" && (
          <div className="h-24 px-9 border-b bg-red-700 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <PageBreadcrumbTeacher pageTitle="" pageSubTitle="LMS" />
              <h1 className="text-2xl font-medium text-white dark:text-white">
                {pageTitle}
              </h1>
            </div>
            <div className="inline-flex items-baseline gap-1">
              <FontAwesomeIcon icon={faDownload} size="sm" className="text-white w-5 h-5" />
              <p className="text-white">
                Download
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
