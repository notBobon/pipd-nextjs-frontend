// components/curriculum/contents/AssessmentModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import AssessmentHeader from "./header/AssessmentHeader";

interface Question {
  question: string;
  options: string[];
}

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answers: (string | null)[]) => void;
}

export default function AssessmentModal({
  isOpen,
  onClose,
  onSubmit,
}: AssessmentModalProps) {
  // ─── Hard‐coded questions ──────────────────────────────────────────────
  const title = "Quiz IT Security Awareness 2023 (Bahasa)";
  const questions: Question[] = [
    {
      question: "1. Kapankah perusahaan ini dibentuk?",
      options: ["2006", "2007", "2008", "2009"],
    },
    {
      question: "2. Apa jenis konten utama di LMS ini?",
      options: ["Video", "Buku", "Quiz", "Survey"],
    },
    {
      question: "3. Berapa durasi standar materi?",
      options: ["5m", "10m", "30m", "60m"],
    },
    {
      question: "4. Apa warna utama brand perusahaan?",
      options: ["Merah", "Biru", "Hijau", "Kuning"],
    },
    {
      question: "5. Berapa skor kelulusan minimal (%)?",
      options: ["60%", "70%", "80%", "90%"],
    },
  ];
  const durationSeconds = 60 * 60; // 1 jam

  // ─── State & timer ────────────────────────────────────────────────────
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(durationSeconds);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );

  useEffect(() => {
    if (!isOpen) return;
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const h = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(h);
  }, [isOpen, timer]);

  const handleChange = (opt: string) => {
    const a = [...answers];
    a[current] = opt;
    setAnswers(a);
  };

  const handleSubmit = () => {
    onSubmit(answers);
    onClose();
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    const el = document.documentElement;
    if (!isFullscreen) {
      await el.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}
      className={
        isFullscreen
          ? // ketika fullscreen: potongan Tailwind untuk MODAL full screen
          "!fixed inset-0 m-0 p-0 max-w-none h-screen w-screen"
          : // normal
          "!max-w-5xl p-0"
      }
    >
      <div className="flex flex-col h-[600px] bg-gray-100">
        <AssessmentHeader
          remainingSeconds={timer}
          onResetTimer={() => setTimer(durationSeconds)}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          onSave={() => {/* simpan jawabannya sementara */ }}
          onSubmit={handleSubmit}
        />
        <div className="flex flex-1 overflow-hidden">
          {/* ——— Left panel ——— */}
          <div className="flex flex-col flex-1 p-6">
            {/* header */}
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold">Question {current + 1}</h5>
            </div>

            {/* pertanyaan */}
            <div className="mb-6">
              <p className="text-xl font-medium">{questions[current].question}</p>
            </div>

            {/* opsi */}
            <div className="space-y-4 flex-1 overflow-y-auto pr-4">
              {questions[current].options.map((opt) => (
                <label key={opt} className="flex items-center space-x-2 text-base">
                  <input
                    type="radio"
                    name={`q${current}`}
                    value={opt}
                    checked={answers[current] === opt}
                    onChange={() => handleChange(opt)}
                    className="form-radio text-indigo-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* nav Prev/Next/Submit */}
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrent((i) => Math.max(0, i - 1))}
                disabled={current === 0}
              >
                Previous
              </Button>
              {current < questions.length - 1 ? (
                <Button
                  size="sm"
                  onClick={() => setCurrent((i) => i + 1)}
                  disabled={answers[current] == null}
                >
                  Next
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={handleSubmit}
                  disabled={answers.some((a) => a == null)}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>

          {/* ——— Right panel ——— */}
          <div className="w-1/4 border-l p-6 bg-gray-50">
            <h5 className="font-semibold mb-1">{title}</h5>
            <p className="text-sm text-gray-600 mb-4">Please Complete</p>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={
                    "w-8 h-8 flex items-center justify-center text-sm font-medium rounded border " +
                    (idx === current
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 hover:bg-gray-100")
                  }
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
