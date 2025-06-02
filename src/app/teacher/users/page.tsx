// app/users/page.tsx   (Next.js 13 app router)
// Jika menggunakan pages/Next.js < 13, letakkan di pages/users.tsx

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faChevronUp,
  faChevronDown,
  faPlay,
  faBackwardStep,
  faForwardStep,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

interface UserRow {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: string;
}
const mockUsers: UserRow[] = [
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
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    username: "budisantoso",
    role: "Instructor",
    status: "Inactive",
  },
  {
    id: "U003",
    name: "Citra Hapsari",
    email: "citra.hapsari@example.com",
    username: "citrahapsari",
    role: "Learner",
    status: "Active",
  },
  {
    id: "U004",
    name: "Dewi Kusuma",
    email: "dewi.kusuma@example.com",
    username: "dewikusuma",
    role: "Learner",
    status: "Active",
  },
  {
    id: "U005",
    name: "Eko Prabowo",
    email: "eko.prabowo@example.com",
    username: "ekoprabowo",
    role: "Instructor",
    status: "Active",
  },
  {
    id: "U006",
    name: "Farah Azizah",
    email: "farah.azizah@example.com",
    username: "farahazizah",
    role: "Learner",
    status: "Inactive",
  },
  {
    id: "U007",
    name: "Galih Nugroho",
    email: "galih.nugroho@example.com",
    username: "galihnugroho",
    role: "Administrator",
    status: "Active",
  },
  {
    id: "U008",
    name: "Hendra Wijaya",
    email: "hendra.wijaya@example.com",
    username: "hendrawijaya",
    role: "Learner",
    status: "Active",
  },
  {
    id: "U009",
    name: "Indah Lestari",
    email: "indah.lestari@example.com",
    username: "indahlestari",
    role: "Instructor",
    status: "Inactive",
  },
  {
    id: "U010",
    name: "Joko Susilo",
    email: "joko.susilo@example.com",
    username: "jokosusilo",
    role: "Learner",
    status: "Active",
  },
];

export default function UsersPage() {
  // ======== State dasar untuk tabel (dummy empty) ========
  const [data] = useState<UserRow[]>(mockUsers); // Awalnya kosong
  const [sortColumn, setSortColumn] = useState<string>(""); // kolom apa yg sedang di‐sort
  const [sortAsc, setSortAsc] = useState<boolean>(true);   // ascending/descending
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // Untuk mempermudah, karena data kosong, kita render “No User Data”
  // Namun kita tetap tampilkan header, pagination, dsb.

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

  return (
    <div className="px-2">
      {/* ====== Tombol Filters di atas ====== */}
      <div className="mb-4 flex items-center justify-between">
        <button
          className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-50"
          onClick={() => {
            /* Logic membuka dropdown filter (jika mau) */
            alert("Filters clicked (buka dropdown/filter panel)");
          }}
        >
          <FontAwesomeIcon icon={faFilter} className="w-4 h-4 " />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* ====== Pagination & Controls ====== */}
      <div className="mt-5 mb-5 flex flex-col gap-2 sm:flex-row items-center justify-end">
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

      {/* ====== Tabel dengan header sortable ====== */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">

        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              {/* Checkbox seleksi (kosong) */}
              <th className="p-2 w-12">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
              </th>
              {/** Kolom “Actions” tidak sortable */}
              <th className="p-2 w-24">Actions <FontAwesomeIcon icon={faSort} size="sm" className="w-3 h-3 text-gray-600" /></th>

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

              {/* LMS Role */}
              <th
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center gap-1">
                  <span>LMS Role  <FontAwesomeIcon icon={faSort} size="sm" className="w-3 h-3 text-gray-600" /></span>
                  {sortColumn === "role" && (
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
              data
                .slice((boundedPage - 1) * rowsPerPage, boundedPage * rowsPerPage)
                .map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-none even:bg-white odd:bg-gray-50"
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                    <td className="p-2">
                      {/* Tombol‐tombol aksi, misal edit/delete */}
                      <button className="text-indigo-600 hover:underline text-xs">
                        Edit
                      </button>{" "}
                      |{" "}
                      <button className="text-red-600 hover:underline text-xs">
                        Delete
                      </button>
                    </td>
                    <td className="p-2">{row.id}</td>
                    <td className="p-2">{row.name}</td>
                    <td className="p-2">{row.email}</td>
                    <td className="p-2">{row.username}</td>
                    <td className="p-2">{row.role}</td>
                    <td className="p-2">{row.status}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
