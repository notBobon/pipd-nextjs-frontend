// components/CardGrid.tsx
"use client";
import React, { useState } from "react";
import CurriculumModal from "@/components/curriculum/CurriculumModal";
import { useSidebar } from "@/context/SidebarContext";
import CardSearchResults, { CardSearchResultsProps } from "./CardSearchResults";

const cards: Omit<CardSearchResultsProps, "onClick">[] = [
  {
    id: "156",
    imageSrc: "/images/grid-image/image-04.png",
    imageAlt: "Some workspace",
    title: "Mandatory E-Learning Refresher 2023 [Bahasa Indonesia]",
    description: "CUR156",
    rating: 4,
  },
  {
    id: "157",
    imageSrc: "/images/grid-image/image-05.png",
    imageAlt: "Another scene",
    title: "Mandatory E-Learning Refresher 2023 [Bahasa Inggris]",
    description: "CUR157",
    rating: 2,
  },
  {
    id: "158",
    imageSrc: "/images/grid-image/image-06.png",
    imageAlt: "Get things done",
    title: "Mandatory E-Learning Refresher 2024",
    description: "CUR158",
    rating: 3,
  },
];

export default function CardGridSearchResults() {
  const { isExpanded } = useSidebar();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openDetail = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };
  const closeDetail = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <div className="px-8 text-sm">
          We have&nbsp;
          <span className="font-medium">{cards.length} items</span>
          &nbsp;available for you
        </div>
        <div
          className={`grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-y-6 ${
            isExpanded ? "gap-x-6" : ""
          }`}
        >
          {cards.map((c) => (
            <CardSearchResults key={c.id} {...c} onClick={openDetail} />
          ))}
        </div>
      </div>

      {selectedId && (
        <CurriculumModal
          id={selectedId}
          isOpen={modalOpen}
          onClose={closeDetail}
        />
      )}
    </>
  );
}
