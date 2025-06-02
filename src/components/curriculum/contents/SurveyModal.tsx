// components/curriculum/contents/SurveyModal.tsx
"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faExpand,
  faCompress,
  faSave,
  faCheckCircle,
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/button/Button";
import SurveyCompletion from "../dialog/SurveyCompletion";

interface Question {
  id: number;
  text: string;
  choices: string[];
}
interface Item {
  type: string;
  title: string;
  duration: string;
}

interface SurveyModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function SurveyModal({
  item,
  isOpen,
  onClose,
  onSubmit,
}: SurveyModalProps) {
  // 5 hard-coded questions
  const questions: Question[] = [
    { id: 1, text: "How satisfied are you with this course?", choices: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"] },
    { id: 2, text: "Was the content clear and well organized?", choices: ["Yes", "Somewhat", "No"] },
    { id: 3, text: "How likely are you to recommend this to a colleague?", choices: ["Very likely", "Likely", "Unlikely"] },
    { id: 4, text: "How helpful were the examples?", choices: ["Very helpful", "Somewhat", "Not helpful"] },
    { id: 5, text: "Overall, how would you rate your learning experience?", choices: ["Excellent", "Good", "Fair", "Poor"] },
  ];

  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<"consent" | "survey">("consent");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      await document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const [showComplete, setShowComplete] = useState(false);

  const handleContinue = () => {
    setShowComplete(false);
    onClose();
  };

    const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
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
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white px-6 py-4">
          <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-gray-700" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">LOGO</span>
          </div>
          <div className="flex items-center gap-4">
            {step === "survey" && (
              <button>
                <FontAwesomeIcon icon={faSave} className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <button onClick={toggleFullscreen}>
              <FontAwesomeIcon
                icon={isFullscreen ? faCompress : faExpand}
                className="w-6 h-6 text-gray-700"
              />
            </button>
          </div>
        </div>

        <div className={isFullscreen
          ? "flex flex-col h-screen bg-gray-100"
          : "flex flex-col h-[600px] bg-gray-100"}>
          {step === "consent" ? (
            // Consent screen
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <FontAwesomeIcon icon={faCheckCircle} className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="mb-6 text-gray-600">
                By clicking “Agree & Continue” you consent to participate in this survey.
              </p>
              <Button
                size="md"
                onClick={() => setStep("survey")}
                className="bg-indigo-600 text-white"
              >
                Agree &amp; Continue →
              </Button>
            </div>
          ) : (
            // Survey questions panel
            <div className="flex justify-center">
              {/* Left: questions */}
              <div className="flex flex-col items-center overflow-auto p-6">
                <div className="mb-4 text-center space-y-4">
                  <p className="font-medium text-red-600">
                    Question {current + 1} of {questions.length}
                  </p>
                  <h4 className="text-xl font-medium">{questions[current].text}</h4>
                </div>
                {/* Prev / Next / Submit */}
                <div className="mt-6 flex gap-3">
                  {current < questions.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setCurrent((i) => i + 1)}

                    >
                      Agree & Continue →
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-indigo-600 text-white"
                      onClick={onSubmit}

                    >
                      Submit Survey <FontAwesomeIcon icon={faUpload} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <SurveyCompletion
        isOpen={showComplete}
        title={item.title}
        onComplete={handleContinue}
        onSkip={handleSkip}
      />

    </>
  );
}
