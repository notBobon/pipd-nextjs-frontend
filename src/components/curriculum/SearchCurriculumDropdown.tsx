// components/learning/SearchCurriculumDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CurriculumModal from "@/components/curriculum/CurriculumModal";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";

export interface CurriculumItem {
  id: string;
  title: string;
  code: string;
}

interface SearchCurriculumDropdownProps {
  items: CurriculumItem[];
}

export default function SearchCurriculumDropdown({
  items,
}: SearchCurriculumDropdownProps) {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  // tutup dropdown kalau klik di luar
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    setDropdownOpen(v.length > 0);
  };

  // subsequence matcher
  function matcher(title: string, q: string): number {
    if (!q) return 0;
    let pos = 0;
    for (let i = 0; i < title.length; i++) {
      if (title[i] === q[pos]) pos++;
      if (pos === q.length) return i - q.length + 1;
    }
    return -1;
  }

  const q = query.trim().toLowerCase();
  const filtered = items
    .map(item => {
      const pos = matcher(item.title.toLowerCase(), q);
      return { item, pos };
    })
    .filter(({ pos }) => pos >= 0)
    .sort((a, b) => a.pos - b.pos)
    .map(({ item }) => item);

  return (
    <div className="relative w-[400px]" ref={ref}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search by title…"
          value={query}
          onChange={onChange}
          className={
            "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-500 " +
            "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 " +
            "dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 " +
            "dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
          }
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      {dropdownOpen && (
        <ul
          className={
            "absolute z-20 mt-1 max-h-60 w-full divide-y divide-gray-200 overflow-y-auto " +
            "rounded-lg border border-gray-300 bg-white shadow-lg " +
            "dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800"
          }
        >
          {filtered.slice(0, 2).map(item => (
            <li
              key={item.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setSelectedId(item.id);
                setModalOpen(true);
                setDropdownOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-red-700 rounded-md">
                  <FontAwesomeIcon
                    icon={faNoteSticky}
                    size="lg"
                    className="text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.code}
                  </span>
                </div>
              </div>
            </li>
          ))}

          {filtered.length > 2 && (
            <li className="px-4 py-2 text-center">
              <Link
                href="/mylearning/searchresults"
                className="text-indigo-600 hover:underline text-sm font-medium"
                onClick={() => setDropdownOpen(false)}
              >
                View All ({filtered.length})
              </Link>
            </li>
          )}
          {filtered.length === 0 && (
            <li className="px-4 py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
              No results found
            </li>
          )}
        </ul>
      )}

      {/* CurriculumModal */}
      <CurriculumModal
        id={selectedId}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
