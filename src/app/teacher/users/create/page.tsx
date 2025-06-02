// app/(protected)/users/create/page.tsx
"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCloudUploadAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/form/input/InputField";
import DatePicker from "@/components/form/date-picker";

export default function CreateUserPage() {
  // ─── State untuk semua field form ───────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [status, setStatus] = useState("Active");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Organization fields
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState<string[]>([]);
  const [lmsRoles, setLmsRoles] = useState<string[]>([]);
  const [lineManager, setLineManager] = useState("");
  const [indirectLineManager, setIndirectLineManager] = useState("");
  const [organizationalUnit, setOrganizationalUnit] = useState("");
  const [type, setType] = useState("");

  // Profile picture upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // ─── Pilihan dropdown (mock) ───────────────────────────────────────────
  const designationOptions = [
    "Manager",
    "Supervisor",
    "Staff",
    "Intern",
  ];
  const roleOptions = ["Learner", "Teacher", "Admin", "Guest"];
  const lmsRoleOptions = ["Learner", "Teacher", "Instructor", "Admin"];
  const lineManagerOptions = ["Alice Johnson", "Bob Smith", "Charlie Lee"];
  const orgUnitOptions = ["HR", "Engineering", "Sales", "Marketing"];
  const typeOptions = ["Full-Time", "Part-Time", "Contractor", "Visitor"];

  // ─── Helper untuk menambah/kurangi tag di multi‐select ────────────────
  const toggleArrayItem = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    if (arr.includes(value)) {
      setArr(arr.filter((x) => x !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  // ─── Fungsi upload file (drag & drop / browse) ────────────────────────
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) previewImage(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) previewImage(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ─── Saat tombol “Save Details” diklik ────────────────────────────────
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini Anda bisa mengirim data ke API atau memvalidasi
    const payload = {
      firstName,
      lastName,
      uniqueId,
      status,
      dateOfJoining,
      email,
      username,
      password,
      designation,
      role,
      lmsRoles,
      lineManager,
      indirectLineManager,
      organizationalUnit,
      type,
      // profilePicture: previewSrc,
    };
    console.log("Saving user:", payload);
    // reset jika perlu:
    // ...
  };

  // ─── Fungsi untuk reset/Cancel ────────────────────────────────────────
  const handleCancel = () => {
    // Reset semua state kembali default
    setFirstName("");
    setLastName("");
    setUniqueId("");
    setStatus("Active");
    setDateOfJoining("");
    setEmail("");
    setUsername("");
    setPassword("");
    setDesignation("");
    setRole([]);
    setLmsRoles([]);
    setLineManager("");
    setIndirectLineManager("");
    setOrganizationalUnit("");
    setType("");
    setPreviewSrc(null);
  };

  return (
    <form onSubmit={handleSave} className="mx-auto space-y-6 bg-white border border-gray-200 rounded-md shadow-sm">
      {/* ─── Informational Header ──────────────────────────────────────── */}
      <div className="">
        <div className="inline-flex items-center h-18 w-full gap-2 px-6 py-2 bg-red-100 text-red-700">
          <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="font-medium">Information</span>
            <span className="text-xs text-gray-500">
              Capture all the required information based on User Roles
            </span>
          </div>
        </div>
      </div>

      {/* ─── Bagian GENERAL (revised layout) ───────────────────────────────────────────── */}
      <fieldset className="rounded-md px-6 space-y-5">
        <legend className="text-lg font-semibold text-gray-700">
          General
        </legend>
        <div className="grid grid-cols-12 gap-4">
          {/* Row 1 */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name*
            </label>
            <Input
              id="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="uniqueId" className="block text-sm font-medium text-gray-700">
              Unique ID*
            </label>
            <input
              id="uniqueId"
              type="text"
              placeholder="12310"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status*
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="mt-1 block w-1/2 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Row 2 */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <div className="w-1/2">
              <DatePicker
                id="date-of-joining"
                label="Date of Joining"
                placeholder=""
                onChange={(dates, currentDateString) => {
                  // Handle your logic
                  console.log({ dates, currentDateString });
                }}
              />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-3/4 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Row 3 */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username*
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password*
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"

            />
          </div>
        </div>
      </fieldset>

      {/* ─── Bagian ORGANIZATION (revised layout) ─────────────────────────────────────── */}
      <fieldset className="rounded-md px-6 space-y-5">
        <legend className="px-2 text-lg font-semibold text-gray-700">
          Organization
        </legend>
        <div className="grid grid-cols-12 gap-4">
          {/* 1) Designation */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select --</option>
              {designationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 2) Role (multi‐select tags) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700">Role*</label>
            <div className="mt-1 flex flex-wrap gap-1">
              {roleOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleArrayItem(role, setRole, opt)}
                  className={`px-2 py-1 border rounded-sm text-sm ${role.includes(opt)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {role.length > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {role.join(", ")}
              </p>
            )}
          </div>

          {/* 3) LMS Role (multi‐select tags) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700">LMS Role*</label>
            <div className="mt-1 flex flex-wrap gap-1">
              {lmsRoleOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleArrayItem(lmsRoles, setLmsRoles, opt)}
                  className={`px-2 py-1 border rounded-sm text-sm ${lmsRoles.includes(opt)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {lmsRoles.length > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                Selected: {lmsRoles.join(", ")}
              </p>
            )}
          </div>

          {/* 4) Line Manager */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label htmlFor="lineManager" className="block text-sm font-medium text-gray-700">
              Line Manager
            </label>
            <select
              id="lineManager"
              value={lineManager}
              onChange={(e) => setLineManager(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select --</option>
              {lineManagerOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 5) Indirect Line Manager */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label
              htmlFor="indirectLineManager"
              className="block text-sm font-medium text-gray-700"
            >
              Indirect Line Manager
            </label>
            <select
              id="indirectLineManager"
              value={indirectLineManager}
              onChange={(e) => setIndirectLineManager(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select --</option>
              {lineManagerOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 6) Organizational Unit */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label htmlFor="organizationalUnit" className="block text-sm font-medium text-gray-700">
              Organizational Unit*
            </label>
            <div className="relative">
              <select
                id="organizationalUnit"
                value={organizationalUnit}
                onChange={(e) => setOrganizationalUnit(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">-- Select Unit --</option>
                {orgUnitOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {/* External link icon on the right */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6m6-1l-8 8m8 0V5m0 8H10"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 7) Type */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-md px-6 space-y-5">
        <div className="flex flex-col">
          <legend className="px-2 text-lg font-semibold text-gray-800">
            Profile Picture
          </legend>
          <p className="px-2 text-xs text-gray-400">
            A default profile image automatically displays if not uploaded
          </p>
        </div>

        <div className="grid grid-cols-12 gap-20 p-4">
          {/* 8) Profile Picture Upload (drag & drop) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div
              className={`mt-1 relative flex items-center justify-center h-62 border-2 border-dashed rounded-md ${dragging ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-white"
                }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt="Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FontAwesomeIcon icon={faCloudUploadAlt} size="5x" className="w-16 h-16" />
                  <p className="mt-1 text-2xl font-bold">
                    Drag and drop&nbsp;
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-indigo-600 font-normal text-sm hover:text-indigo-800"
                  >
                    <span className="text-sm font-normal no-underline text-gray-400">or </span><span className="underline">Browse File</span>
                  </button>
                  <p className="mt-1 text-xs text-gray-500">Accepts: JPG, PNG, GIF</p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 9) Preview Icon (to the right of the upload box) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2">
            <div className="flex flex-col items-center mt-15 text-gray-600">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCircleInfo} />
                <span className="text-sm font-medium">Preview</span>
              </div>

              <div className="mt-4 w-25 h-25 flex items-center justify-center bg-gray-200 rounded-full">
                {/* Placeholder “person” icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-15 w-15 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4c0 1.657 1.343 3 3 3a4 4 0 014-4 4 4 0 00-4-4zm-4 9a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </fieldset>




      {/* ─── Tombol Save & Cancel ───────────────────────────────────────────── */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-sm bg-white text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
        >
          Save Details
        </button>
      </div>
    </form>
  );
}
