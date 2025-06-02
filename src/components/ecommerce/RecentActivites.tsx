// components/UpcomingEvents.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faClipboard, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

export interface EventItem {
  title: string;
  href?: string;
  location: string;
  date: string;
  time: string;
}

export default function RecentActivites() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faChartLine} size="lg" className="text-red-700 w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Activites
          </h3>
        </div>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Edit
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Event List */}
      <div className="py-6 px-2">

        <div className="flex items-center gap-4 rounded-lg border-gray-100 px-3.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5">
          <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg">
            <FontAwesomeIcon icon={faNoteSticky} size="lg" className="text-white" />
          </div>
          <div className="space-y-2">
            <div className="">
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                Module 4: Data Vizualization Basics
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Data Literacy Fundamentals
              </p>
            </div>
            <div className="flex w-full max-w-[200px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[150px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[55%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                55%
              </p>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-4 rounded-lg border-gray-100 px-3.5 py-2 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5">
          <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg">
            <FontAwesomeIcon icon={faClipboard} size="lg" className="text-white" />
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                Assessment 1: Digital Marketing Introduction
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Digital Marketing Fundamentals
              </p>
            </div>
            <div className="flex w-full max-w-[200px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[150px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[20%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                20%
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border-gray-100 px-3.5 py-2 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5">
          <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg">
            <FontAwesomeIcon icon={faClipboard} size="lg" className="text-white" />
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                Assesment 7: Business Processes
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Modern Business Pre-Requisite
              </p>
            </div>
            <div className="flex w-full max-w-[200px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[150px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[84%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                84%
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border-gray-100 px-3.5 py-2 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5">
          <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-lg">
            <FontAwesomeIcon icon={faNoteSticky} size="lg" className="text-white" />
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                Module 1: Company Culture and Leadership
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mandatory E-Leaning 2025
              </p>
            </div>
            <div className="flex w-full max-w-[200px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[150px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[0%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                0%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/calendar" className=" inline-flex gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          View Activites
        </Link>
      </div>
    </div>
  );
}
