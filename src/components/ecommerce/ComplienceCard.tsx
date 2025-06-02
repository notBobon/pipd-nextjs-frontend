"use client";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon icon={faScaleBalanced} className="text-red-700" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Compliance Status
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
      <div className="space-y-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className="inline-flex gap-3 items-center align-middle h-30">
              <FontAwesomeIcon icon={faCircleInfo} className="text-theme-md" />
              <Link href="/" className="font-semibold text-gray-800 text-theme-md dark:text-white/90 hover:text-red-600 hover:underline">
                There are no updates to display here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
