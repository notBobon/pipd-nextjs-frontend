// components/learning/LearningHeader.tsx
"use client";

import React from "react";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import SearchCurriculumDropdown, {
  CurriculumItem,
} from "./SearchCurriculumDropdown";

const catalogOptions = [
  { value: "all", label: "Catalog" },
  { value: "video", label: "Video" },
  { value: "book", label: "Book" },
  // …opsi lain
];

// contoh data dummy
const curricula: CurriculumItem[] = [
  { id: "156", title: "Mandatory E-Learning Refreshment 2023 [Bahasa Indonesia]", code: "CUR156" },
  { id: "157", title: "Mandatory E-Learning Refreshment 2023 [English]", code: "CUR157" },
  { id: "158", title: "Mandatory E-Learning Refreshment 2024", code: "CUR158" },
  { id: "159", title: "Agile Software Development", code: "CUR159" },
  { id: "160", title: "Data Science with Python", code: "CUR160" },
];

export default function LearningHeader() {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-t border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      {/* Left: Catalog select */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Select
            options={catalogOptions}
            defaultValue="all"
            onChange={() => {}}
            className="pr-8"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDownIcon />
          </span>
        </div>
        {/* Search + dropdown */}
      <SearchCurriculumDropdown items={curricula} />
      </div>

       

      {/* Right: User summary */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon size="xl" icon={faClipboardList} className="w-9 h-9 size-lg" />
          <div className="text-sm">
            <p className="font-medium">User Learner</p>
            <p className="text-xs">7 On Going   7 Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
