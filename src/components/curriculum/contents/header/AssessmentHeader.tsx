// components/curriculum/contents/AssessmentHeader.tsx
"use client";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faExpand,
  faCompress,
  faCaretDown,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

interface AssessmentHeaderProps {
  remainingSeconds: number;
  onResetTimer: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onSave: () => void;
  onSubmit: () => void;
}

export default function AssessmentHeader({
  remainingSeconds,
  onResetTimer,
  onToggleFullscreen,
  isFullscreen,
  onSave,
  onSubmit,
}: AssessmentHeaderProps) {
  // format HH:MM:SS
  const fmt = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  return (
    <div className="flex items-center justify-end bg-white px-6 py-3 gap-8">
      {/* Left: Timer + Reset */}
      <div className="inline-flex items-center gap-2">
        <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-gray-700" />
        <span className="font-semibold text-md">{fmt(remainingSeconds)}</span>
        <button
          onClick={onResetTimer}
          title="Reset Timer"
          className="p-1 rounded hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faArrowsRotate} rotation={180} className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Middle: Save/Submit dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center gap-1 rounded-lg border px-3 py-1 hover:bg-white bg-white">
          Save/ Submit
          <FontAwesomeIcon icon={faCaretDown} className="w-4 h-4 text-gray-600" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-1 w-40 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-1 focus:outline-none z-10">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSave}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Save Draft
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSubmit}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Submit All
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Right: Fullscreen toggle */}
      <button
        onClick={onToggleFullscreen}
        className="p-1 rounded hover:bg-gray-200"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        <FontAwesomeIcon
          icon={isFullscreen ? faCompress : faExpand}
          className="w-5 h-5 text-gray-700"
        />
      </button>
    </div>
  );
}
