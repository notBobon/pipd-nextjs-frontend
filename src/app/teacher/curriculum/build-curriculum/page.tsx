"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionBanks from '../../../../components/teacher/curriculum/builder/Step1QuestionBanks';
import {
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Assessment from "@/components/teacher/curriculum/builder/Step2Assessment";
import ReferenceMaterials from "@/components/teacher/curriculum/builder/Step3ReferenceMaterials";
import Curriculum from "@/components/teacher/curriculum/builder/Step4Curriculum";
import ReviewPublish from "@/components/teacher/curriculum/builder/Step5ReviewPublish";

type Step = 1 | 2 | 3 | 4 | 5;

const stepLabels = [
    { step: 1, title: "Questions Banks" },
    { step: 2, title: "Assessment" },
    { step: 3, title: "Reference Materials" },
    { step: 4, title: "Curriculum" },
    { step: 5, title: "Review & Publish" },
];

export default function CurriculumBuilderPage() {
    // State untuk langkah saat ini (1–5)
    const [currentStep, setCurrentStep] = useState<Step>(1);

    // Fungsi untuk pindah ke langkah berikutnya
    const goNext = () => {
        setCurrentStep((prev) => (prev < 5 ? (prev + 1) as Step : prev));
    };
    // Fungsi untuk kembali ke langkah sebelumnya
    const goBack = () => {
        setCurrentStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* ────────────────────────────────────────────── */}
            {/*  1) Stepper Bar di Bagian Atas                */}
            {/* ────────────────────────────────────────────── */}
            <nav className="mb-6 flex items-center justify-center gap-2">
                {stepLabels.map((item, idx) => {
                    const isActive = item.step === currentStep;
                    const isCompleted = item.step < currentStep;
                    return (
                        <React.Fragment key={item.step}>
                            {/* Setiap langkah ditampilkan sebagai blok teks */}
                            <div
                                className={`
                  flex cursor-pointer flex-col items-center
                  ${isActive ? "text-gray-900" : "text-gray-400"}
                `}
                                onClick={() => setCurrentStep(item.step as Step)}
                            >
                                <span
                                    className={`text-sm font-medium ${isCompleted
                                                ? "text-red-600"
                                                : "text-gray-400" } 
                                            `}
                                >
                                    Step {item.step}
                                </span>
                                <span
                                    className={`
                    font-bold
                    ${isActive
                                            ? "border-b-2 border-red-600 text-red-600"
                                            : isCompleted
                                                ? "text-gray-600"
                                                : "text-gray-400"
                                        }
                  `}
                                >
                                    {item.title}
                                </span>
                            </div>
                            {/* Panah pemisah, kecuali setelah yang terakhir */}
                            {idx < stepLabels.length - 1 && (
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className={`h-3 w-3 ${item.step < currentStep ? "text-red-500" : "text-gray-300"
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>

            {/* ────────────────────────────────────────────── */}
            {/*  3) Konten Step 1: “Questions Banks”          */}
            {/* ────────────────────────────────────────────── */}
            {currentStep === 1 && (
                <div className="">
                    <QuestionBanks onNext={goNext} onBack={goBack} />
                </div>
            )}

            {/* ────────────────────────────────────────────── */}
            {/*  4) Konten Placeholder untuk Step Lainnya     */}
            {/* ────────────────────────────────────────────── */}
            {currentStep === 2 && (
                <div className="">
                    <Assessment onNext={goNext} onBack={goBack} />
                </div>
            )}
            {currentStep === 3 && (
                <div className="">
                    <ReferenceMaterials onNext={goNext} onBack={goBack} />
                </div>
            )}
            {currentStep === 4 && (
                <div className="">
                    <Curriculum onNext={goNext} onBack={goBack} />
                </div>
            )}
            {currentStep === 5 && (
                <div className="">
                    <ReviewPublish onBack={goBack} />
                </div>
            )}
        </div>
    );
}
