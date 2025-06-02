// components/UpcomingEvents.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

export interface EventItem {
  title: string;
  href?: string;
  location: string;
  date: string;
  time: string;
}

export default function UpcomingEvents() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <FontAwesomeIcon icon={faCalendar} size="lg" className="text-red-700 w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Upcoming Events
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
              Add Events
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Event List */}
      <div className="space-y-7 py-5 px-2">
        
          <div className="relative">
            {/* side bar accent */}
            <span className="absolute left-0 top-0 bottom-0 w-2 bg-red-600 rounded" />

            {/* event info */}
            <div className="pl-8 flex flex-col">
              <Link
                href={"/"}
                className="font-semibold text-gray-800 dark:text-white hover:text-red-600 hover:underline"
              >
                Webinar: &quot;Future of Digital Learning&quot;
              </Link>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Online Zoom Meeting, 13 April 2025
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                14:00 - 16:00
              </div>
            </div>
          </div>

          <div className="relative">
            {/* side bar accent */}
            <span className="absolute left-0 top-0 bottom-0 w-2 bg-red-600 rounded" />

            {/* event info */}
            <div className="pl-8 flex flex-col">
              <Link
                href={"/"}
                className="font-semibold text-gray-800 dark:text-white hover:text-red-600 hover:underline"
              >
                Workshop: &quot;Effective Time Management for Learners&quot;
              </Link>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Meeting Room 12F, 5 May 2025
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                09:00 - 12:00
              </div>
            </div>
          </div>

          <div className="relative">
            {/* side bar accent */}
            <span className="absolute left-0 top-0 bottom-0 w-2 bg-red-600 rounded" />

            {/* event info */}
            <div className="pl-8 flex flex-col">
              <Link
                href={"/"}
                className="font-semibold text-gray-800 dark:text-white hover:text-red-600 hover:underline"
              >
                Mentorship Session: &quot;Career Development in Tech&quot;
              </Link>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Convention Hall, 20 May 2025
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                15:00 - 16:00
              </div>
            </div>
          </div>

          <div className="relative">
            {/* side bar accent */}
            <span className="absolute left-0 top-0 bottom-0 w-2 bg-red-600 rounded" />

            {/* event info */}
            <div className="pl-8 flex flex-col">
              <Link
                href={"/"}
                className="font-semibold text-gray-800 dark:text-white hover:text-red-600 hover:underline"
              >
                Internal Development: &quot;Career Development in Tech&quot;
              </Link>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Online Zoom Meeting, 19 June 2025
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                11:00 - 15:00
              </div>
            </div>
          </div>
        
      </div>
      <div className="flex justify-end gap-4">
        <Link href="/calendar" className=" inline-flex gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          View All Events
        </Link>
      </div>
    </div>
  );
}
