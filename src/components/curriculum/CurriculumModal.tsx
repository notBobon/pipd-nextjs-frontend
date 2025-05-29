// components/curriculum/CurriculumModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import Rating from "@/components/ui/cards/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/button/Button";
import CurriculumTabs from "./CurriculumTabs";
import CurriculumStat from "./CurriculumStat";
import PdfViewer from "@/components/ui/pdf/PdfViewer";

// 👉 import our new modals
import AssessmentModal from "@/components/curriculum/contents/AssessmentModal";
import SurveyModal from "@/components/curriculum/contents/SurveyModal";
import AssessmentConfirmationModal from "./contents/AssessmentConfirmationModal";
import ContentCompletion from "./dialog/ContentCompletion";
import SurveyCompletion from "./dialog/SurveyCompletion";

interface Curriculum {
  id: string;
  title: string;
  image: string;
  type: string;
  code: string;
  rating: number;
  lastAccessed: string;
  enroll: boolean;
  items: { type: string; title: string; duration: string }[];
}

interface CurriculumModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CurriculumModal({ id, isOpen, onClose }: CurriculumModalProps) {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);

  // this will track which content modal is open
  const [activeContent, setActiveContent] = useState<{
    type: "assessment" | "survey" | "document";
    itemIndex: number;
  } | null>(null);

  // new: holds an assessment index waiting for confirmation
  const [confirmAssessmentIdx, setConfirmAssessmentIdx] = useState<number | null>(null);

  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showComplete, setShowComplete] = useState(false);

  // 👉 Kita gunakan completedDocs untuk menandai semua content (dokumen & assessment) yg sudah complete
  const [completedDocs, setCompletedDocs] = useState<number[]>([]);

  const [showSurveyComplete, setShowSurveyComplete] = useState(false);
  const [completedSurveys, setCompletedSurveys] = useState<number[]>([]);
  const [surveyIdx, setSurveyIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setCurriculum({
      id,
      title: "Mandatory E-Learning Refresher 2023 [Bahasa Indonesia]",
      image: "/images/grid-image/image-01.png",
      type: "Self Assigned",
      code: `CUR${id}`,
      rating: 4,
      lastAccessed: "20 May 2025",
      enroll: false,
      items: [
        { type: "Reference Material", title: "Material BAHASA", duration: "5m" },
        { type: "Assessment", title: "Quiz IT Security", duration: "50m" },
        { type: "Survey", title: "Approval Form", duration: "35m" },
      ],
    });
  }, [id, isOpen]);

  if (!curriculum) return null;

  const closeContent = () => {
    setActiveContent(null);
    setConfirmAssessmentIdx(null);
  };

  // hitung total menit
  const totalMinutes = curriculum.items.reduce((sum, i) => {
    const parts = i.duration.split(" ").map((p) => p.trim());
    let mins = 0;
    parts.forEach((p) => {
      if (p.endsWith("h")) mins += parseInt(p) * 60;
      else if (p.endsWith("m")) mins += parseInt(p);
    });
    return sum + mins;
  }, 0);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const totalDuration = `${h}h ${m}m`;

  // kumpulkan tags
  const tags = [
    curriculum.code,
    ...curriculum.items.map(i =>
      i.type === "Reference Material" ? "Materials" :
        i.type === "Assessment" ? "Assessments" :
          i.type === "Survey" ? "Surveys" : i.type
    ),
  ];

  const handleStart = (type: "document" | "assessment" | "survey", idx: number) => {
    if (type === "document") {
      setActiveContent({ type, itemIndex: idx });
      setPdfUrl("/files/test.pdf");
      setShowPdf(true);
    } else if (type === "assessment") {
      setConfirmAssessmentIdx(idx);
    } else {
      setSurveyIdx(idx);
      setActiveContent({ type, itemIndex: idx });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className="!max-w-6xl p-0 h-full">
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          <div className="flex items-center p-6 bg-gray-100 dark:border-gray-700">
            <button onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              <span className="text-xl font-medium underline">Back</span>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-start bg-gray-100 px-9 py-6">
              <div className="max-w-[650px] space-y-9">
                <p className="font-bold text-4xl">{curriculum.title}</p>
                <div className="flex items-center gap-8 text-sm">
                  <div className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleInfo} className="text-red-700" />
                    <span>{curriculum.code}</span>
                  </div>
                  <Rating rating={curriculum.rating} />
                </div>
                {!curriculum.enroll
                  ? <Button size="sm" onClick={() => setCurriculum({ ...curriculum, enroll: true })}>Enroll Now</Button>
                  : <div className="inline-flex items-center gap-2 text-sm font-semibold">
                    <FontAwesomeIcon icon={faClock} className="text-red-700" />
                    <span>Started</span>
                  </div>
                }
              </div>
              <Image
                src={curriculum.image}
                alt={curriculum.title}
                width={335}
                height={250}
                className="rounded-2xl"
              />
            </div>

            <div className="flex justify-between">
              <div className="p-9">
                {/* ➡️ Kita pass completedDocs & onStart */}
                <CurriculumTabs
                  enroll={curriculum.enroll}
                  items={curriculum.items}
                  completedDocs={completedDocs}
                  completedSurveys={completedSurveys}
                  onStart={handleStart}
                />
              </div>
              <div className="p-9">
                <CurriculumStat itemsCount={curriculum.items.length} totalDuration={totalDuration} tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* assessment confirmation */}
      {confirmAssessmentIdx !== null && (
        <AssessmentConfirmationModal
          item={{
            title: curriculum.items[confirmAssessmentIdx].title,
            duration: curriculum.items[confirmAssessmentIdx].duration,
            attempts: 10,
            passing: 80,
            marksPerCorrect: 10,
          }}
          isOpen={true}
          onCancel={() => setConfirmAssessmentIdx(null)}
          onConfirm={() => {
            setActiveContent({ type: "assessment", itemIndex: confirmAssessmentIdx });
            setConfirmAssessmentIdx(null);
          }}
        />
      )}

      {/* assessment modal */}
      {activeContent?.type === "assessment" && (
        <AssessmentModal
          isOpen={true}
          onClose={closeContent}
          quizTitle={curriculum.items[activeContent.itemIndex].title}
          itemIndex={activeContent.itemIndex}
          onCompleteAssessment={(idx) => {
            // ➡️ begitu user Mark as Complete, kita tandai index ini
            setCompletedDocs(prev => Array.from(new Set([...prev, idx])));
            closeContent();
          }}
        />
      )}

      {/* survey modal */}
      {activeContent?.type === "survey" && (
        <SurveyModal
          isOpen={true}
          onClose={closeContent}
          onSubmit={() => {
            closeContent();
            setShowSurveyComplete(true);
          }}
          item={curriculum.items[activeContent.itemIndex]}
        />
      )}

      {/* pdf viewer */}
      {activeContent?.type === "document" && (
        <PdfViewer
          url={pdfUrl}
          isOpen={showPdf}
          onClose={() => {
            setShowPdf(false);
            setShowComplete(true);
          }}
        />
      )}

      {/* content completion dialog (untuk dokumen) */}
      <ContentCompletion
        isOpen={showComplete}
        title={curriculum.title}
        onComplete={() => {
          if (activeContent) {
            setCompletedDocs(prev => Array.from(new Set([...prev, activeContent.itemIndex])));
          }
          setShowComplete(false);
          setActiveContent(null);
        }}
        onSkip={() => {
          setShowComplete(false);
          setActiveContent(null);
        }}
      />

      {/* ─── SurveyCompletion ───────────────────────── */}
      {surveyIdx !== null && (
        <SurveyCompletion
          isOpen={showSurveyComplete}
          title={curriculum.items[surveyIdx].title}
          onComplete={() => {
            setCompletedSurveys(prev => [...prev, surveyIdx]);
            setShowSurveyComplete(false);
          }}
          onSkip={() => {
            setShowSurveyComplete(false);
          }}
        />
      )}
    </>
  );
}
