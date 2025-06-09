// app/(protected)/users/create/page.tsx
"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import Input from "@/components/form/input/InputField";
import DatePicker from "@/components/form/date-picker";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import OrganizationalUnitModal from "@/components/teacher/users/OrganizationalUnitModal";
import Link from "next/link";
import DropzoneComponent from "@/components/form/form-elements/DropZoneCustom";

// Declare your “Unit” interface exactly the same as the modal expects
interface Unit {
  name: string;
  code: string;
}

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

  const optionsStatus = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const optionsDesignation = [
    { value: "keyword", label: "Keyword" },
    { value: "manager", label: "Manager" },
    { value: "supervisor", label: "Supservisor" },
    { value: "staff", label: "Staff" },
    { value: "intern", label: "Intern" },
  ];

  const optionsRole = [
    { value: "keyword", label: "Keyword" },
    { value: "registered", label: "Registered" },
    { value: "guest", label: "Guest" },
  ];

  const optionsLineManager = [
    { value: "keyword", label: "Keyword" },
    { value: "aj", label: "Alice Johnson" },
    { value: "bs", label: "Bob Smith" },
    { value: "cl", label: "Charlie Lee" },
  ];

  // 1) Track whether the OrganizationalUnitModal is showing
  const [modalOpen, setModalOpen] = useState(false);

  // 2) Track which unit (if any) has been selected
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);


  const unitList: Unit[] = [
    { name: "Compliance & Legal", code: "OUID01" },
    { name: "Customer Support", code: "OUID02" },
    { name: "Cybersecurity", code: "OUID03" },
    { name: "Human Capital (HC)", code: "OUID04" },
    { name: "Information Technology", code: "OUID05" },
    { name: "Internal Audit", code: "OUID06" },
    { name: "Lending Operations", code: "OUID07" },
    { name: "Product Management", code: "OUID08" },
    { name: "Risk Management", code: "OUID09" },
    { name: "Sales & Partnership", code: "OUID10" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  // Called whenever the user picks “Select Unit” inside the modal.
  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setModalOpen(false);
  };

  // Called when user clicks “Cancel” in the modal (or clicks outside)
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Opens the modal
  const openModal = () => {
    setModalOpen(true);
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
            <div>
              <Label>First Name<span className="text-red-500">*</span></Label>
              <Input type="text" />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div>
              <Label>Last Name<span className="text-red-500">*</span></Label>
              <Input type="text" />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div>
              <Label>Unique ID<span className="text-red-500">*</span></Label>
              <Input type="text" placeholder="12310" disabled className="bg-gray-100 font-semibold" />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="w-1/2">
              <Label>Status<span className="text-red-500">*</span></Label>
              <div className="relative">
                <Select
                  options={optionsStatus}
                  placeholder="Select an option"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="">
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

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            {/* Isian */}
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div>
              <Label>Email<span className="text-red-500">*</span></Label>
              <Input type="text" />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-2">
            {/* Isian */}
          </div>

          {/* Row 3 */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div>
              <Label>Username<span className="text-red-500">*</span></Label>
              <Input type="text" />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden  dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-red-300 focus:ring-3 focus:ring-red-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
            />
          </div>
        </div>
      </fieldset>

      {/* ─── Bagian ORGANIZATION (revised layout) ─────────────────────────────────────── */}
      <fieldset className="rounded-md px-6 space-y-5">
        <legend className="px-2 text-lg font-semibold text-gray-700">
          Organization
        </legend>
        <div className="grid grid-cols-12 gap-4 px-2">
          {/* 1) Designation */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="">
              <Label>Designation</Label>
              <div className="relative">
                <Select
                  options={optionsDesignation}
                  placeholder="Keyword"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            {/* Isian */}
          </div>

          {/* 2) Role (multi‐select tags) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="">
              <Label>Role</Label>
              <div className="relative">
                <Select
                  options={optionsRole}
                  placeholder="Keyword"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          {/* 3) LMS Role (multi‐select tags) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="relative">
              <div className="flex flex-col">
                <Label>LMS Role<span className="text-red-500">*</span></Label>
                <button className="mt-1 h-9 w-25 border py-1 px-2 border-red-600 bg-red-600 rounded-xl">
                  <div className="inline-flex items-center">
                    <p className="items-center text-sm text-white">Learner</p>
                    <FontAwesomeIcon icon={faXmark} size="sm" className="w-4 h-4 ml-2 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 4) Line Manager */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="">
              <Label>Line Manager</Label>
              <div className="relative">
                <Select
                  options={optionsLineManager}
                  placeholder="Keyword"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          {/* 5) Indirect Line Manager */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="">
              <Label>Inline Manager</Label>
              <div className="relative">
                <Select
                  options={optionsLineManager}
                  placeholder="Keyword"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          {/* 6) Organizational Unit (button + modal) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <Label>
              Organizational Unit <span className="text-red-500">*</span>
            </Label>
            <button
              onClick={openModal}
              className="
            mt-1 h-11 w-full rounded-lg border border-gray-300 
            bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs
            focus:outline-none focus:border-red-300 focus:ring-3 focus:ring-red-500/10
            dark:border-gray-700 dark:bg-gray-900 dark:text-white/90
            dark:focus:border-brand-800
          "
            >
              <div className="inline-flex w-full justify-between items-baseline gap-2">
                {selectedUnit
                  ? (
                    // If a unit is already selected, show its name + code
                    <p className="font-medium">{selectedUnit.name} ({selectedUnit.code})</p>
                  )
                  : (
                    // Otherwise, show a placeholder
                    <p className="font-medium text-gray-500">--Select Unit--</p>
                  )}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </div>
            </button>
          </div>

          {/* 7) Type */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2">
            <div>
              <Label>Type</Label>
              <Input type="text" />
            </div>
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
            <DropzoneComponent />
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
      <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-18 w-full">
        <Link
          href="/teacher/users/view/table1"
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
      {/* OrganizationalUnitModal appears when modalOpen===true */}
      <OrganizationalUnitModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSelect={handleUnitSelect}
        units={unitList}
      />
    </form>
  );
}
