// components/curriculum/AssessmentConfirmationModal.tsx
"use client";
import React from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Item {
  title: string;
  duration: string;      // e.g. "50m"
  attempts: number;      // e.g. 10
  passing: number;       // e.g. 80 (means 80%)
  marksPerCorrect: number; // e.g. 10
}

interface AssessmentConfirmationModalProps {
  item: Item;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AssessmentConfirmationModal({
  item,
  isOpen,
  onCancel,
  onConfirm,
}: AssessmentConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      showCloseButton={false}
      className="max-w-lg"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FontAwesomeIcon icon={faClipboard} /> Assessment
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <p className="font-medium">{item.title}</p>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="font-medium">Available Attempts</dt>
            <dd>{item.attempts}</dd>
            <dt className="font-medium">Passing</dt>
            <dd>{item.passing}%</dd>
            <dt className="font-medium">Correct Answer</dt>
            <dd>+{item.marksPerCorrect} Marks</dd>
            <dt className="font-medium">Duration</dt>
            <dd>{item.duration}</dd>
          </dl>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <Button size="sm" onClick={onConfirm}>
            Start New
          </Button>
        </div>
      </div>
    </Modal>
  );
}
