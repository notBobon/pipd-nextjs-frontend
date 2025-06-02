"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

interface CurriculumStatProps {
  itemsCount: number;
  totalDuration: string; // misal "2h 10m"
  tags: string[];
}

export default function CurriculumStat({
  itemsCount,
  totalDuration,
  tags,
}: CurriculumStatProps) {
  return (
    <div>
      {/* Features */}
      <h4 className="mb-4 font-medium text-gray-700 dark:text-white border-b pb-2">
        Features
      </h4>
      <ul className="space-y-3 mb-6 text-sm">
        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faPhotoFilm} className="w-5 h-5 text-gray-500" />
          {itemsCount} Contents
        </li>
        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-gray-500" />
          Duration: {totalDuration}
        </li>
        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <span className="inline-block w-2 h-2 bg-orange-500 rounded-full" />
          Mandatory Content
        </li>
      </ul>

      {/* Tags */}
      <h4 className="mb-2 font-medium text-gray-700 dark:text-white">
        Tags
      </h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
