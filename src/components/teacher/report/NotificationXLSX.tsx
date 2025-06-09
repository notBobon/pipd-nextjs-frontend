// components/UserActions.tsx
"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileExcel,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function NotificationXlsx() {
  // When true, we show the “Download success” notification.
  const [showToast, setShowToast] = useState(false);

  // Whenever showToast becomes true, auto‐dismiss after e.g. 3 seconds.
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  // Called when the user clicks the “Export XLSX” link
  const handleExportClick = () => {
    setShowToast(true);
    // Note: the <a download=...> will begin the actual file download
  };

  return (
    <>
      {/* ––––– The action buttons ––––– */}
      <div className="flex flex-row gap-4">
        {/** Send Email button (still a Next.js Link) */}
        <a
          href="/teacher/users/bulk"
          className="inline-flex items-baseline gap-1 text-white"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            size="sm"
            className="w-5 h-5 text-white"
          />
          <p className="text-white text-sm">Send Email</p>
        </a>

        {/** Export XLSX – use a plain <a> with download="" */}
        <a
          href="/files/dummyexcel.xlsx"
          download="dummyexcel.xlsx"
          onClick={handleExportClick}
          className="inline-flex items-baseline gap-1 text-white"
        >
          <FontAwesomeIcon
            icon={faFileExcel}
            size="sm"
            className="w-5 h-5 text-white"
          />
          <p className="text-white text-sm">Export XLSX</p>
        </a>

        {/** Export CSV – similar pattern */}
        <a
          href="/files/dummyexcel.csv"
          download="dummyexcel.csv"
          onClick={handleExportClick}
          className="inline-flex items-baseline gap-1 text-white"
        >
          <FontAwesomeIcon
            icon={faFileExcel}
            size="sm"
            className="w-5 h-5 text-white"
          />
          <p className="text-white text-sm">Export CSV</p>
        </a>
      </div>

      {/* ––––– Toast/Notification ––––– */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md">
          {/* Check‐circle icon */}
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="w-5 h-5 text-green-600"
          />
          {/* Notification text */}
          <span className="text-gray-800">Download XLSX file success!</span>
          {/* Dismiss “X” button */}
          <button onClick={() => setShowToast(false)} className="pl-4">
            <FontAwesomeIcon
              icon={faXmark}
              className="w-4 h-4 text-gray-500 hover:text-gray-700"
            />
          </button>
        </div>
      )}
    </>
  );
}
