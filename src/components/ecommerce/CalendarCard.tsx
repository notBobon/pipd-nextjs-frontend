// components/CalendarCard.tsx
"use client";

import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarCard() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="rounded-2xl border flex-col border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 w-full">
      {/* Card Header */}
      <div className="inline-flex gap-2 items-baseline">
        <FontAwesomeIcon icon={faCalendarDays} className="text-red-700" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Calendar
        </h3>
      </div>

      {/* Calendar Container */}
      <div className="overflow-hidden rounded-lg shadow-sm p-4 mt-4 text-center">
        <Calendar
          onChange={(nextDate) => setDate(nextDate as Date)}
          value={date}
          calendarType="iso8601"
          className="react-calendar w-full"
        />
      </div>

      <div className="mt-4 flex justify-between gap-3">
        {/* Selected Date (opsional) */}
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Selected Date:</span>{" "}
          {date.toDateString()}
        </p>

        <Link href="/calendar" className=" inline-flex gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          Full Calendar
        </Link>
      </div>

    </div>
  );
}
