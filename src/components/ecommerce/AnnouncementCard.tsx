"use client";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AnnouncementCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div className="inline-flex gap-2 items-baseline">
          <FontAwesomeIcon icon={faBullhorn} className="text-red-700" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Announcements
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
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="space-y-7 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div>
              <Link href="/" className="font-semibold text-gray-800 text-theme-md dark:text-white/90 hover:text-red-600 hover:underline">
                New User Interface
              </Link>
              <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                20 April, 15:10
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div>
              <Link href="/" className="font-semibold text-gray-800 text-theme-md dark:text-white/90 hover:text-red-600 hover:underline">
                LMS Maintenance 15 May 2025
              </Link>
              <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                12 April, 09:39
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div>
              <Link href="/" className="font-semibold text-gray-800 text-theme-md dark:text-white/90 hover:text-red-600 hover:underline">
                Operational Services Changes 2025
              </Link>
              <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                20 Mar, 14:21
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div>
              <Link href="/" className="font-semibold text-gray-800 text-theme-md dark:text-white/90 hover:text-red-600 hover:underline">
                LMS Maintenance 15 March 2025
              </Link>
              <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                8 Mar, 17:00
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
