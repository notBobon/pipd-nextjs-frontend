// app/(protected)/users/create/page.tsx
"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faDownload } from '@fortawesome/free-solid-svg-icons';
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import Link from "next/link";
import DropzoneComponent from "@/components/form/form-elements/DropZoneBulk";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

export default function BulkUserPage() {
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
  };

  const optionsLanguage = [
    { value: "english", label: "English (en)" },
    { value: "indonesian", label: "Indonesia (id)" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <form onSubmit={handleSave} className="mx-auto space-y-6 bg-white border border-gray-200 rounded-md shadow-sm">
      {/* ─── Informational Header ──────────────────────────────────────── */}
      <div className="">
        <div className="inline-flex items-center h-18 w-full gap-2 px-6 py-2 bg-gray-100 text-gray-700">
          <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="font-medium">Information</span>
            <span className="text-xs text-gray-500">
              Create new or update the existing Users from here. You can download User Details Report, update the sample template with this data and upload
            </span>
          </div>
        </div>
      </div>

      {/* ─── Bagian GENERAL (revised layout) ───────────────────────────────────────────── */}
      <fieldset className="rounded-md px-6 space-y-5 mb-20">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <div className="w-1/2">
              <Label>Language<span className="text-red-500">*</span></Label>
              <div className="relative">
                <Select
                  options={optionsLanguage}
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <div>
              <Label>Unique Identifier</Label>
              <Link className="inline-flex items-baseline gap-1" href="/teacher/users/bulk">
                <p className="text-sm text-red-600">Unique ID</p>
                <FontAwesomeIcon icon={faCircleQuestion} size="xs" className="text-red-600" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <div className="w-3/4">
              <Label>Choose File</Label>
              <p className="text-xs mb-6 text-gray-400">
                Upload your user data here to create or update users
              </p>
              <DropzoneComponent />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <div>
              <Label>Templates</Label>
              <div className="flex gap-6">
                <Link className="inline-flex items-baseline gap-1" href="/teacher/users/bulk">
                  <FontAwesomeIcon icon={faDownload} size="xs" className="text-red-600" />
                  <p className="text-sm text-red-600">Your Data</p>
                </Link>
                <Link className="inline-flex items-baseline gap-1" href="/teacher/users/bulk">
                  <FontAwesomeIcon icon={faDownload} size="xs" className="text-red-600" />
                  <p className="text-sm text-red-600">Sample Templates</p>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </fieldset>

      {/* ─── Tombol Save & Cancel ───────────────────────────────────────────── */}
      <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-18 w-full">
        <Link
          href="/teacher/users/view/table2"
          className="h-10 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Save Details
        </Link>
        <button
          type="button"
          onClick={handleCancel}
          className="h-10 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
