// components/OrganizationalUnitModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal"; // adjust this path if your Modal is elsewhere
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faChevronDown, faChevronUp, faFilter, faForwardStep, faPlay, faSort, faSortDown, faSortUp, faUpload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Learner {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: string;
}
const mockUsers: Learner[] = [
  {
    id: "U001",
    name: "Andi Pratama",
    email: "andi.pratama@example.com",
    username: "andipratama",
    role: "Administrator",
    status: "Active",
  },
  {
    id: "U002",
    name: "Andi Pratama",
    email: "andi.pratama@example.com",
    username: "andipratama",
    role: "Administrator",
    status: "Active",
  },
];

interface AssignLearnersModalProps {
  isOpen: boolean;
  onClose: () => void;
  allUsers: Learner[];
  onAssign: (users: Learner[]) => void;
}

export default function AssignLearnersModal({
  isOpen,
  onClose,
  allUsers,
  onAssign,
}: AssignLearnersModalProps) {
  // Keep track of which unit (by index) is currently “selected” inside the modal
  const [, setSelectedIndex] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data] = useState<Learner[]>(mockUsers); // Awalnya kosong
  const [sortColumn, setSortColumn] = useState<string>(""); // kolom apa yg sedang di‐sort
  const [sortAsc, setSortAsc] = useState<boolean>(true);   // ascending/descending
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // Untuk mempermudah, karena data kosong, kita render “No User Data”
  // Namun kita tetap tampilkan header, pagination, dsb.

  const toggleRow = (idx: number) => {
    setSelectedRows(s =>
      s.includes(idx) ? s.filter(i => i !== idx) : [...s, idx]
    );
  };

  const confirm = () => {
    // ambil objek Learner dari indeks yang di-select
    const picked = selectedRows.map(i => allUsers[i]);
    onAssign(picked);
    setSelectedRows([]);
  };


  // Jumlah total baris (pada kasus nyata ini dari API)
  const totalRows = data.length;
  // Hitung berapa halaman
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  // Bound currentPage agar tidak melebihi totalPages
  const boundedPage = Math.min(currentPage, totalPages);

  // ======== Fungsi pendukung ========

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      // Toggle arah sort
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(columnKey);
      setSortAsc(true);
    }
    // Jika ada data, apply sort (di production Anda bisa sort data array di sini)
  };

  const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const onGoToPage = () => {
    // Panggil ulang load data (jika ada) untuk halaman boundedPage
    setCurrentPage(boundedPage);
  };

  // Navigasi pagination
  const gotoFirst = () => setCurrentPage(1);
  const gotoLast = () => setCurrentPage(totalPages);
  const gotoPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const gotoNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Hitung rentang baris yang sedang ditampilkan
  const startRow = totalRows === 0 ? 0 : (boundedPage - 1) * rowsPerPage + 1;
  const endRow =
    totalRows === 0
      ? 0
      : Math.min(totalRows, (boundedPage - 1) * rowsPerPage + rowsPerPage);

  const handleCancel = () => {
    setSelectedIndex(null);
    onClose();
  };

  const allSelected = selectedRows.length === data.length && data.length > 0;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, index) => index)); // semua index dipilih
    } else {
      setSelectedRows([]);
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      className="!max-w-3xl md:!max-w-4xl lg:!max-w-5xl"
      showCloseButton={true}
      isFullscreen={false}
    >
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 pt-4 px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav>
            <ol className="flex items-center gap-1.5">
              <li>
                <Link
                  className="inline-flex items-center gap-1.5 text-sm dark:text-gray-400"
                  href="/"
                >
                  Content
                  <svg
                    className="stroke-current"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke=""
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
              <li className="text-sm dark:text-white/90 underline">
                Curriculum
              </li>
            </ol>
          </nav>
        </div>
        <h1 className="text-2xl font-medium dark:text-white">
          Assign Learners
        </h1>
        <p>Curriculum: Introduction to LMS Design</p>
      </div>

      {/* ====== Tombol Filters di atas ====== */}
      <div className="mt-5 flex items-center justify-between px-6">
        <button
          className="inline-flex items-center gap-2 bg-gray-200 border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-xl hover:bg-gray-50 h-11"
          onClick={() => {
            /* Logic membuka dropdown filter (jika mau) */
            alert("Filters clicked (buka dropdown/filter panel)");
          }}
        >
          <FontAwesomeIcon icon={faFilter} className="w-4 h-4 " />
          <span className="font-medium">Filters</span>
        </button>
        <button
          className="inline-flex items-center gap-2 bg-gray-200 border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-50 h-11"
          onClick={() => {
            /* Logic membuka dropdown filter (jika mau) */
            alert("Filters clicked (buka dropdown/filter panel)");
          }}
        >
          <FontAwesomeIcon icon={faUpload} className="w-4 h-4 " />
          <span className="font-medium">Bulk Add</span>
        </button>
      </div>

      {/* ====== Pagination & Controls ====== */}
      <div className="mt-5 mb-5 flex flex-col gap-2 sm:flex-row items-center justify-end px-6">
        {/* Kanan: Pagination and Rows‐per‐page */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {/* Tombol navigasi halaman */}
          <div className="flex items-center gap-1">
            <button
              onClick={gotoFirst}
              disabled={boundedPage === 1}
              className={`p-1 rounded-md ${boundedPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon icon={faBackwardStep} size="xs" className="w-3 h-3" />
            </button>
            <button
              onClick={gotoPrev}
              disabled={boundedPage === 1}
              className={`p-1 rounded-md ${boundedPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              <FontAwesomeIcon icon={faPlay} size="xs" className="w-3 h-3 rotate-180" />
            </button>
            {/* Left: Teks “Showing X to Y of Z” */}
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
              <FontAwesomeIcon icon={faForwardStep} size="xs" className="w-3 h-3" />
            </button>
          </div>

          {/* “Show X Records” dropdown */}
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

          {/* Input manual page dan tombol Go */}
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

          {/* “More Columns” link */}
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

      <div className="px-6 pb-10">
        {/* ====== Tabel dengan header sortable ====== */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">

          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr className="h-18">
                {/* Checkbox seleksi (kosong) */}
                <th className="p-2 w-12">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-red-600"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>

                {/* Unique ID */}
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    <span>Unique ID</span>
                    {sortColumn === "id" && (
                      <FontAwesomeIcon
                        icon={sortAsc ? faSortUp : faSortDown}
                        className="w-3 h-3 text-gray-600"
                      />
                    )}
                  </div>
                </th>

                {/* Name */}
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    <span>Name <FontAwesomeIcon icon={faSort} size="sm" className="w-3 h-3 text-gray-600" /></span>
                    {sortColumn === "name" && (
                      <FontAwesomeIcon
                        icon={sortAsc ? faChevronUp : faChevronDown}
                        className="w-3 h-3 text-gray-600"
                      />
                    )}
                  </div>
                </th>

                {/* Email */}
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-1">
                    <span>Email  <FontAwesomeIcon icon={faSort} size="sm" className="w-3 h-3 text-gray-600" /></span>
                    {sortColumn === "email" && (
                      <FontAwesomeIcon
                        icon={sortAsc ? faChevronUp : faChevronDown}
                        className="w-3 h-3 text-gray-600"
                      />
                    )}
                  </div>
                </th>

                {/* Username */}
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSort("username")}
                >
                  <div className="flex items-center gap-1">
                    <span>Username  <FontAwesomeIcon icon={faSort} size="sm" className="w-3 h-3 text-gray-600" /></span>
                    {sortColumn === "username" && (
                      <FontAwesomeIcon
                        icon={sortAsc ? faChevronUp : faChevronDown}
                        className="w-3 h-3 text-gray-600"
                      />
                    )}
                  </div>
                </th>

                {/* Status */}
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    <span>Status  <FontAwesomeIcon icon={faSort} size="sm" className="w-3 h-3 text-gray-600" /></span>
                    {sortColumn === "status" && (
                      <FontAwesomeIcon
                        icon={sortAsc ? faChevronUp : faChevronDown}
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
                // Jika ada data: contoh iterasi (saat produksi, gunakan data asli Anda)
                allUsers
                  .slice((boundedPage - 1) * rowsPerPage, boundedPage * rowsPerPage)
                  .map((row, idx) => (
                    <tr
                      key={row.id}
                      className="border-b last:border-none bg-white h-20"
                    >
                      <td className="p-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-red-600"
                          checked={selectedRows.includes(idx)}
                          onChange={() => toggleRow(idx)}
                        />
                      </td>
                      <td className="p-2">{row.id}</td>
                      <td className="p-2">{row.name}</td>
                      <td className="p-2">{row.email}</td>
                      <td className="p-2">{row.username}</td>
                      <td className="p-2">{row.status}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Footer (Select / Cancel) ───────────────────────────────────────── */}
      <div className="border-t bg-gray-100 dark:bg-gray-800 flex justify-between">
        <button
          onClick={confirm}
          disabled={selectedRows.length === 0}
          className={`
          flex items-center justify-center w-full px-6 py-2 font-medium h-15
          ${selectedRows.length > 0
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"}
          `}
        >
          Assign Learners
        </button>
        <button
          onClick={handleCancel}
          className="
            px-6 py-2 font-medium w-full h-15
            border border-gray-300 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700
          "
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
