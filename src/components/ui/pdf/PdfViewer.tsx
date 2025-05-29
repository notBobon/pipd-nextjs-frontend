// components/ui/PdfViewer.tsx
"use client";
import React, { useRef, useState } from "react";
import { Modal } from "../modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

interface PdfViewerProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewer({ url, isOpen, onClose }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);


  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!isFullscreen) {
      try {
        await el.requestFullscreen?.();
        setIsFullscreen(true);
      } catch {}
    } else {
      try {
        await document.exitFullscreen?.();
        setIsFullscreen(false);
      } catch {}
    }
  };

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="!max-w-4xl !p-0"
    >
      <div className="relative flex flex-col">
        {/* fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-3 right-5 z-10 rounded p-1 bg-[#3C3C3C]"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          <FontAwesomeIcon
            icon={isFullscreen ? faCompress : faExpand}
            className="w-5 h-5 text-gray-100"
          />
        </button>

        {/* scrollable PDF */}
        <div ref={containerRef} className="overflow-y-auto h-[80vh]">
          <object
            data={url}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p className="p-4 text-center">
              Your browser doesn’t support embedded PDFs.
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline ml-1"
              >
                Download PDF
              </a>
            </p>
          </object>
        </div>
      </div>
    </Modal>
  );
}
