// components/OrganizationalUnitModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal"; // adjust this path if your Modal is elsewhere
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

export interface Unit {
  name: string;
  code: string;
}

interface OrganizationalUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (unit: Unit) => void;
  units: Unit[];
}

export default function OrganizationalUnitModal({
  isOpen,
  onClose,
  onSelect,
  units,
}: OrganizationalUnitModalProps) {
  // Keep track of which unit (by index) is currently “selected” inside the modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onSelect(units[selectedIndex]);
      setSelectedIndex(null);
    }
  };

  const handleCancel = () => {
    setSelectedIndex(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      className="!max-w-3xl md:!max-w-4xl lg:!max-w-5xl"
      showCloseButton={false}
      isFullscreen={false}
    >
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="">
        <div className="inline-flex items-center h-18 w-full gap-2 px-6 py-2 bg-gray-100 text-gray-700">
          <FontAwesomeIcon icon={faUniversalAccess} size="lg" className="w-6 h-6" />
          <div className="flex flex-col">
            <span className="font-medium">Organizational Unit</span>
            <span className="text-xs text-gray-500">
              Select one appropriate unit based on the user&apos;s function in the system
            </span>
          </div>
        </div>
      </div>

      {/* ─── Body: Two‐column grid of unit “cards” ──────────────────────────── */}
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {units.map((unit, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={unit.code}
                onClick={() => handleCardClick(idx)}
                className={`
                  relative flex flex-col justify-center px-4 py-6 h-20 border-2 rounded-lg text-left
                  transition-colors
                  ${isActive
                    ? "border-red-600 bg-red-50 dark:bg-indigo-900/20"
                    : "border-gray-300 bg-white hover:border-red-400 hover:bg-red-50/50 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-indigo-600"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`
                      text-lg font-semibold
                      ${isActive ? "text-red-700 dark:text-indigo-300" : "text-gray-800 dark:text-gray-200"}
                    `}
                  >
                    {unit.name}
                  </span>
                  {isActive && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="xl"
                      className="text-red-600 dark:text-indigo-300 w-6 h-6"
                    />
                  )}
                </div>
                <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {unit.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Footer (Select / Cancel) ───────────────────────────────────────── */}
      <div className="border-t bg-gray-100 dark:bg-gray-800 flex justify-between">
        <button
          onClick={handleConfirm}
          disabled={selectedIndex === null}
          className={`
            flex items-center justify-center w-full px-6 py-2 font-medium h-15
            ${selectedIndex !== null
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"}
          `}
        >
          Select Unit
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
