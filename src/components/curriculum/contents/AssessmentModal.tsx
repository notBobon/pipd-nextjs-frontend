// components/curriculum/contents/AssessmentModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import AssessmentHeader from "./header/AssessmentHeader";
import AssessmentCompletion from "../dialog/AssessmentCompletion";

interface Question {
  id: number;
  text: string;
  choices: string[];
  correctIndex: number;
}

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizTitle: string;
  itemIndex: number;                            // ➡️ baru
  onCompleteAssessment: (idx: number) => void;  // ➡️ baru
}

export default function AssessmentModal({
  isOpen,
  onClose,
  quizTitle,
  itemIndex,
  onCompleteAssessment,
}: AssessmentModalProps) {
  // ─── Hard‐coded questions ─────────────────────────────────────────────
  const questions: Question[] = [
    { id: 1, text: "Kapankah perusahaan ini dibentuk?", choices: ["2006", "2007", "2008", "2009"], correctIndex: 2 },
    { id: 2, text: "Apa jenis konten utama di LMS ini?", choices: ["Video", "Buku", "Quiz", "Survey"], correctIndex: 2 },
    { id: 3, text: "Berapa durasi standar materi?", choices: ["5 Menit", "6 Menit", "7 Menit", "8 Menit"], correctIndex: 1 },
    { id: 4, text: "Apa warna utama brand perusahaan?", choices: ["Merah", "Biru", "Kuning", "Hijau"], correctIndex: 1 },
    { id: 5, text: "Berapa skor kelulusan minimal (%)?", choices: ["60%", "70%", "80%", "90%"], correctIndex: 2 },
  ];

  const durationSeconds = 60 * 60; // 1 jam

  // ─── State & timer ────────────────────────────────────────────────────
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(durationSeconds);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showCompletion, setShowCompletion] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // simpan jawaban
  const selectAnswer = (choiceIdx: number) => {
    const copy = [...answers];
    copy[current] = choiceIdx;
    setAnswers(copy);
  };

  // timer countdown
  useEffect(() => {
    if (!isOpen || showCompletion) return;
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const h = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(h);
  }, [isOpen, timer, showCompletion]);

  // full‐screen toggle
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

  // submit kuis
  const handleSubmit = () => {
    const score = answers.reduce(
      (sum, ans, idx) => (ans === questions[idx].correctIndex ? sum + 1 : sum),
      0
    );
    setFinalScore(score);
    setShowCompletion(true);
  };

  const handleContinue = () => {
    setShowCompletion(false);
    onCompleteAssessment(itemIndex);
  };

  const handleRetry = () => {
    setShowCompletion(false);
    setAnswers(Array(questions.length).fill(-1));
    setCurrent(0);
    setTimer(durationSeconds);
  };

  if (!isOpen) return null;

  // soal saat ini
  const q = questions[current];

  return (
    <>
      {!showCompletion && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          showCloseButton={false}
          className={
            isFullscreen
              ? "!fixed inset-0 m-0 p-0 max-w-none h-screen w-screen"
              : "!max-w-5xl p-0"
          }
        >
          <div className={isFullscreen
            ? "flex flex-col h-screen bg-gray-100"
            : "flex flex-col h-[600px] bg-gray-100"}
          >
            {/* header dengan timer, save/submit, fullscreen */}
            <AssessmentHeader
              remainingSeconds={timer}
              onResetTimer={() => setTimer(durationSeconds)}
              onToggleFullscreen={toggleFullscreen}
              isFullscreen={isFullscreen}
              onSave={() => { }}
              onSubmit={handleSubmit}
            />

            <div className="flex flex-1 overflow-hidden">
              {/* Left panel: soal */}
              <div className="flex flex-col flex-1 p-6 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-lg font-semibold">Question {q.id}</h5>
                </div>
                <p className="mb-4">{q.text}</p>
                <div className="space-y-4">
                  {q.choices.map((c, ci) => (
                    <label key={ci} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`q${current}`}
                        checked={answers[current] === ci}
                        onChange={() => selectAnswer(ci)}
                      />
                      <span className="ml-2">{c}</span>
                    </label>
                  ))}
                </div>

                {/* Prev / Next / Submit */}
                <div className="mt-8 flex gap-2">
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
                      disabled={answers[current] < 0}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={handleSubmit}
                      disabled={answers[current] < 0}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>

              {/* Right panel: progress tombol */}
              <div className="w-1/4 border-l p-6 bg-gray-50 overflow-auto">
                <h5 className="font-semibold mb-1">{quizTitle}</h5>
                <p className="text-sm text-gray-600 mb-4">Please Complete</p>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={
                        "w-8 h-8 flex items-center justify-center text-sm font-medium rounded border " +
                        (idx === current
                          ? "bg-red-600 text-white border-red-600"
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
      )}

      {/* Completed Quiz dialog */}
      <AssessmentCompletion
        isOpen={showCompletion}
        title={quizTitle}
        score={finalScore}
        maxScore={questions.length}
        onComplete={handleContinue}
        onRetry={handleRetry}
      />
    </>
  );
}
