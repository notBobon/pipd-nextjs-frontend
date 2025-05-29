// components/ui/CompletionDialog.tsx
"use client";
import React from "react";
import { Modal } from "../../ui/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCheck, faShare } from "@fortawesome/free-solid-svg-icons";

interface CompletionDialogProps {
    isOpen: boolean;
    title: string;
    score: number;
    maxScore: number;
    onComplete: () => void;
    onRetry: () => void;
}

export default function ContentCompletion({
    isOpen,
    title,
    score,
    maxScore,
    onComplete,
    onRetry,
}: CompletionDialogProps) {
    if (!isOpen) return null;
    const passed = score >= 0.6 * maxScore;
    return (
        <Modal isOpen={isOpen} onClose={onComplete} showCloseButton={false} className="max-w-md">
            <div className="flex flex-col items-center text-center gap-4 p-4">
                <div className="inline-flex items-center">
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        size="lg"
                        className="w-8 h-8 text-green-500"
                    />
                    <h3 className="text-lg font-medium">Completed Content</h3>
                </div>
                <p className="text-xl mt-2">{title}</p>
                <p className="text-sm text-gray-600">
                    {passed
                        ? "Congratulations, you have passed the minimum score"
                        : "You did not pass. You can retry the quiz."}
                </p>
                <p className=" text-gray-800">
                    Your Score is{" "}
                    <span className="text-red-600 text-base font-semibold">{score}</span> out of{" "}
                    <span className="text-red-600 text-base font-semibold">{maxScore}</span>
                </p>
            </div>
            <div className="flex justify-center">
                <button onClick={onComplete} className="text-sm bg-red-600 hover:bg-red-700 text-white w-full h-15">
                    <span><FontAwesomeIcon icon={faCheck} size="sm" className="w-4 h-4 mr-1 text-white" /></span>Continue
                </button>
                <button onClick={onRetry} className="w-full text-sm bg-white hover:bg-gray-200 border h-15">
                    <span><FontAwesomeIcon icon={faShare} size="sm" className="w-4 h-4 mr-1" /></span>Reattempt Quiz
                </button>
            </div>
        </Modal>
    );
}



