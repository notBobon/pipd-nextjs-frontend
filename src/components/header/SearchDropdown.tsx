"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../ui/dropdown/Dropdown";

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      // fokus setelah membuka
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };
  const closeDropdown = () => setIsOpen(false);

  // tutup saat klik di luar
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}
        aria-label="Open search"
        className={`
          flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100
          rounded-lg h-11 w-11
          dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800
          transition-colors focus:outline-none focus:bg-gray-100
          ${isOpen ? "bg-gray-100 dark:bg-gray-800" : ""}
        `}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {/* Dropdown */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-2 w-[430px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <form autoComplete="off">
          <div className="relative">
            {/* Search Icon */}
            <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
              <FontAwesomeIcon
                icon={faSearch}
                className="fill-gray-500 dark:fill-gray-400"
              />
            </span>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or type command..."
              className="
                h-11 w-full rounded-lg border border-gray-200 bg-transparent
                py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs
                placeholder:text-gray-400 focus:border-brand-300 focus:outline-none
                focus:ring-3 focus:ring-brand-500/10
                dark:border-gray-800 dark:bg-gray-900 dark:text-white/90
                dark:placeholder:text-white/30 dark:focus:border-brand-800
              "
            />

            {/* Shortcut Hint */}
            <button
              type="button"
              className="
                absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center
                gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px]
                text-xs tracking-tight text-gray-500 hover:bg-gray-100
                dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/10
              "
            >
              <span>⌘</span>
              <span>K</span>
            </button>
          </div>
        </form>
      </Dropdown>
    </div>
  );
}
