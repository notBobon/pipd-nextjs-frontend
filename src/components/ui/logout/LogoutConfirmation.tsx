// components/ui/LogoutConfirmation.tsx
"use client";
import React from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutConfirmation({
  isOpen,
  onCancel,
}: LogoutConfirmationProps) {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      showCloseButton={false}
      className="max-w-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <h2 className="font-mono text-lg font-semibold">
          Logout Confirmation
        </h2>
        <button
          onClick={onCancel}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 text-center">
        <p className="font-mono text-sm">
          Are you sure want to logout?
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-4 border-t px-6 py-4">
        <Link
          className="px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          href={"/signin"}
        >
          Confirm
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="font-mono"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
