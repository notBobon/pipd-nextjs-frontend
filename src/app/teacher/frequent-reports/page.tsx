// app/users/page.tsx   (Next.js 13 app router)
// If you are on Next.js < 13, move this to pages/users.tsx and remove "use client" at the top.

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSyncAlt,
  faBackwardStep,
  faForwardStep,
  faPlay,
  faSort,
  faSortUp,
  faSortDown,
  faCalendarDays,
  faXmark,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import StatusOverview from "@/components/teacher/report/StatusOverview";
import Label from "@/components/form/Label";
import Link from "next/link";

interface CurriculumRow {
  name: string;
  type: string;
  start: string;
  end: string;
  status: string;
  seatTime: string;
  completedContents: string;
  completedContentsPercent: string;
}

const mockCurriculum: CurriculumRow[] = [
  {
    name: "Data Science Introduction",
    type: "Hard Skills",
    start: "15/02/2025",
    end: "05/05/2025",
    status: "Incomplete",
    seatTime: "2h 40m",
    completedContents: "8 / 10",
    completedContentsPercent: "75%",
  },
  {
    name: "Mandatory E-Learning 2024 [Bahasa Indonesia]",
    type: "Mandatory OJK",
    start: "31/03/2025",
    end: "04/04/2025",
    status: "Not Started",
    seatTime: "3h 30m",
    completedContents: "5 / 10",
    completedContentsPercent: "50%",
  },
  {
    name: "Agile Development",
    type: "Career Development",
    start: "14/01/2024",
    end: "01/02/2024",
    status: "Completed",
    seatTime: "1h 0m",
    completedContents: "2 / 8",
    completedContentsPercent: "25%",
  },
  {
    name: "Empowerment Induction 2024",
    type: "Mandatory OJK",
    start: "11/12/2024",
    end: "01/01/2025",
    status: "Overdue",
    seatTime: "1h 10m",
    completedContents: "4 / 10",
    completedContentsPercent: "40%",
  },
];

export default function FrequentReportsPage() {
  // ─────── Table / Pagination / Sorting State ───────
  const [data] = useState<CurriculumRow[]>(mockCurriculum);
  const [sortColumn, setSortColumn] = useState<string>(""); // which column is sorted
  const [sortAsc, setSortAsc] = useState<boolean>(true); // ascending or descending
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // ─────── “Filters” panel state ───────
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Totals (for pagination)
  const totalRows = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const boundedPage = Math.min(currentPage, totalPages);

  // ─────── Helpers ───────
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(columnKey);
      setSortAsc(true);
    }
    // (In a real app, you would sort `data` here.)
  };

  const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const onGoToPage = () => {
    setCurrentPage(boundedPage);
    // (In a real app, re‐fetch or slice your data here.)
  };

  const gotoFirst = () => setCurrentPage(1);
  const gotoLast = () => setCurrentPage(totalPages);
  const gotoPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const gotoNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const startRow = totalRows === 0 ? 0 : (boundedPage - 1) * rowsPerPage + 1;
  const endRow =
    totalRows === 0
      ? 0
      : Math.min(totalRows, (boundedPage - 1) * rowsPerPage + rowsPerPage);

  // ─────── Dummy Dropdown Options (replace with real data if desired) ───────
  const keywordOptions = ["Keyword", "Option A", "Option B"];
  const yesNoOptions = ["Yes", "No"];

  // Forum tracking collapse
  const [trackingOpen, setTrackingOpen] = useState(false);

  return (
    <div className="px-2 space-y-8">
      {/* ====== 1) Filters Button ====== */}
      <div className="mb-4 flex items-center justify-between">
        <button
          className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-50 h-11 focus:ring-red-300"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* ====== 2) Conditionally Render Filter Panel ====== */}
      {showFilters && (
        <div className="mb-6 border border-gray-200 bg-white rounded-lg p-4 shadow-sm">
          {/* ─── First Row of Filters ─── */}
          <div className="grid grid-cols-10 gap-4">
            {/* Category */}
            <div className="col-span-10 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="category"
                className="block text-xs font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Access */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="access"
                className="block text-xs font-medium text-gray-700"
              >
                Access
              </label>
              <select
                id="access"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Curriculum Status */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="curriculumStatus"
                className="block text-xs font-medium text-gray-700"
              >
                Curriculum Status
              </label>
              <select
                id="curriculumStatus"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Curriculum */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="curriculum"
                className="block text-xs font-medium text-gray-700"
              >
                Curriculum Name
              </label>
              <input
                id="curriculum"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Curriculum ID */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="curriculumId"
                className="block text-xs font-medium text-gray-700"
              >
                Curriculum ID
              </label>
              <input
                id="curriculumId"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Certificate Attached (Yes/No) */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="certificateAttached"
                className="block text-xs font-medium text-gray-700"
              >
                Certificate Attached
              </label>
              <select
                id="certificateAttached"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {yesNoOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Completed On/Before */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="completedOnBefore"
                className="block text-xs font-medium text-gray-700"
              >
                Completed On/Before
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="completedOnBefore"
                  type="text"
                  className="block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>

            {/* Completed On/After */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="completedOnAfter"
                className="block text-xs font-medium text-gray-700"
              >
                Completed On/After
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="completedOnAfter"
                  type="text"
                  className="block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>

            {/* Progress On/Before */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="progressOnBefore"
                className="block text-xs font-medium text-gray-700"
              >
                Progress On/Before
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="progressOnBefore"
                  type="text"
                  className="block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>

            {/* Progress On/After */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="progressOnAfter"
                className="block text-xs font-medium text-gray-700"
              >
                Progress On/After
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="progressOnAfter"
                  type="text"
                  className="block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="my-4"></div>

          {/* ─── Second Row of Filters ─── */}
          <div className="grid grid-cols-10 gap-4">
            {/* Learning Tracks */}
            <div className="col-span-10 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="learningTracks"
                className="block text-xs font-medium text-gray-700"
              >
                Learning Tracks
              </label>
              <select
                id="learningTracks"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Curriculum Type */}
            <div className="col-span-10 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="curriculumType"
                className="block text-xs font-medium text-gray-700"
              >
                Curriculum Type
              </label>
              <select
                id="curriculumType"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Created By */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="createdBy"
                className="block text-xs font-medium text-gray-700"
              >
                Created By
              </label>
              <select
                id="createdBy"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Line Manager */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="lineManager"
                className="block text-xs font-medium text-gray-700"
              >
                Line Manager
              </label>
              <select
                id="lineManager"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {keywordOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Unique ID */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="uniqueId"
                className="block text-xs font-medium text-gray-700"
              >
                Unique ID
              </label>
              <input
                id="uniqueId"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Name */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Username */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="username"
                className="block text-xs font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Email */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Date Of Joining On/After */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="dojOnAfter"
                className="block text-xs font-medium text-gray-700"
              >
                Date Of Joining On/After
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="dojOnAfter"
                  type="text"
                  className="block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>

            {/* Date Of Joining On/Before */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="dojOnBefore"
                className="block text-xs font-medium text-gray-700"
              >
                Date Of Joining On/Before
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="dojOnBefore"
                  type="text"
                  className="block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="my-4"></div>

          {/* ─── Third Row of Filters (Role, Designation, LMS Role, Status) ─── */}
          <div className="grid grid-cols-10 gap-4">
            {/* Role */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="role"
                className="block text-xs font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {["Keyword", "Learner", "Teacher", "Admin"].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="designation"
                className="block text-xs font-medium text-gray-700"
              >
                Designation
              </label>
              <select
                id="designation"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {["Keyword", "Designation A", "Designation B"].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* LMS Role */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <label
                htmlFor="lmsRole"
                className="block text-xs font-medium text-gray-700"
              >
                LMS Role
              </label>
              <select
                id="lmsRole"
                className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {["Keyword", "Learner", "Teacher", "Manager"].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">
              <div>
                <label
                  htmlFor="status"
                  className="block text-xs font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="lmsRole"
                  className="mt-1 block w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  {["Keyword", "Learner", "Teacher", "Manager"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-2">
                <button className="mt-2 h-8 w-20 border py-1 px-2 border-red-600 bg-red-600 rounded-md">
                  <div className="inline-flex items-center">
                    <p className="items-center text-sm text-white">Active</p>
                    <FontAwesomeIcon icon={faXmark} size="sm" className="w-3 h-3 ml-1 text-white" />
                  </div>
                </button>
                <button className="mt-2 h-8 w-22 border py-1 px-2 border-red-600 bg-red-600 rounded-md">
                  <div className="inline-flex items-center">
                    <p className="items-center text-sm text-white">Dormant</p>
                    <FontAwesomeIcon icon={faXmark} size="sm" className="w-3 h-3 ml-1 text-white" />
                  </div>
                </button>
              </div>

            </div>

            {/* Status */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-2">

            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="my-4"></div>

          {/* Forum tracking (collapsible) */}
          <div className="border-t pt-4">
            <button
              className="flex items-center gap-2 w-full"
              onClick={() => setTrackingOpen((o) => !o)}
            >
              <h4 className="font-semibold text-gray-800">
                Advanced Filters
              </h4>
              {trackingOpen ? (
                <FontAwesomeIcon icon={faCaretUp} className="w-5 h-5 text-gray-500"/>
              ) : (
                <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-gray-500"/>
              )}
            </button>
            {trackingOpen && (
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <Label htmlFor="tracking">Forum tracking</Label>
                  <div className="relative">
                    
                  </div>
                </div>
                <div>
                  <Label htmlFor="notifyAction">
                    When sending forum post notifications
                  </Label>
                  <div className="relative">
                    
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── Search / Reset Buttons ─── */}
          <div className="mt-6 flex space-x-2 justify-start">
            <Link
              href="/teacher/frequent-reports/result"
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
            >
              Search
            </Link>
            <button
              type="button"
              className="px-4 py-2 bg-white text-red-600 border border-red-600 text-sm rounded-md hover:bg-red-50"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}

      {/* ====== 3) Status Overview Chart ====== */}
      <div className="flex items-center justify-center">
        <StatusOverview />
      </div>

      {/* ====== 4) Pagination & Controls ====== */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row items-center justify-end">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={gotoFirst}
              disabled={boundedPage === 1}
              className={`p-1 rounded-md ${boundedPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon
                icon={faBackwardStep}
                size="xs"
                className="w-3 h-3"
              />
            </button>
            <button
              onClick={gotoPrev}
              disabled={boundedPage === 1}
              className={`p-1 rounded-md ${boundedPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon
                icon={faPlay}
                size="xs"
                className="w-3 h-3 rotate-180"
              />
            </button>
            <div className="text-sm text-gray-600">
              Showing {startRow} to {endRow} of {totalRows}{" "}
              {totalRows > 1 ? "records" : "record"}
            </div>
            <button
              onClick={gotoNext}
              disabled={boundedPage === totalPages}
              className={`p-1 rounded-md ${boundedPage === totalPages
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon icon={faPlay} size="xs" className="w-3 h-3" />
            </button>
            <button
              onClick={gotoLast}
              disabled={boundedPage === totalPages}
              className={`p-1 rounded-md ${boundedPage === totalPages
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon
                icon={faForwardStep}
                size="xs"
                className="w-3 h-3"
              />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
              Show
            </label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              className="ml-1 block w-16 border border-gray-300 bg-white text-sm text-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">Records</span>
          </div>

          <div className="flex items-center gap-1">
            <label htmlFor="gotoPage" className="sr-only">
              Go to page
            </label>
            <input
              type="number"
              id="gotoPage"
              value={boundedPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              min={1}
              max={totalPages}
              className="w-16 border border-gray-300 text-sm text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
            <button
              onClick={onGoToPage}
              className="bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700"
            >
              Go
            </button>
          </div>

          <div>
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={() => {
                alert("More Columns clicked!");
              }}
            >
              More Columns
            </button>
          </div>
        </div>
      </div>

      {/* ====== 5) Main Table ====== */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-20">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr className="h-18">
              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  <span>Curriculum</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "name" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center gap-1">
                  <span>Type</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "type" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("start")}
              >
                <div className="flex items-center gap-1">
                  <span>Start</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "start" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("end")}
              >
                <div className="flex items-center gap-1">
                  <span>End</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "end" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  <span>Status</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "status" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("seatTime")}
              >
                <div className="flex items-center gap-1">
                  <span>Seat Time</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "seatTime" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("completedContents")}
              >
                <div className="flex items-center gap-1">
                  <span>Completed Contents</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "completedContents" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>

              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("completedContentsPercent")}
              >
                <div className="flex items-center gap-1">
                  <span>Completed (%)</span>
                  <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-600" />
                  {sortColumn === "completedContentsPercent" && (
                    <FontAwesomeIcon
                      icon={sortAsc ? faSortUp : faSortDown}
                      className="w-3 h-3 text-gray-600"
                    />
                  )}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No User Data
                </td>
              </tr>
            ) : (
              data
                .slice((boundedPage - 1) * rowsPerPage, boundedPage * rowsPerPage)
                .map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-none bg-white h-20"
                  >
                    <td className="p-2">{row.name}</td>
                    <td className="p-2">{row.type}</td>
                    <td className="p-2">{row.start}</td>
                    <td className="p-2">{row.end}</td>
                    <td className="p-2">{row.status}</td>
                    <td className="p-2">{row.seatTime}</td>
                    <td className="p-2 text-center">{row.completedContents}</td>
                    <td className="p-2 text-center">
                      {row.completedContentsPercent}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
