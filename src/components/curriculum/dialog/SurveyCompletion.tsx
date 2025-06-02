// components/ui/CompletionDialog.tsx
"use client";
import React from "react";
import { Modal } from "../../ui/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCheck, faShare } from "@fortawesome/free-solid-svg-icons";

interface CompletionDialogProps {
    isOpen: boolean;
    onComplete: () => void;
    onSkip: () => void;
    title: string;
}

export default function SurveyCompletion({
    isOpen,
    onComplete,
    onSkip,
    title,
}: CompletionDialogProps) {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onSkip} showCloseButton={false} className="max-w-md">
            <div className="flex flex-col items-center text-center gap-4 p-4">
                <div className="inline-flex items-center">
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        size="lg"
                        className="w-8 h-8 text-green-500"
                    />
                    <h3 className="text-lg font-medium">Completed Survey</h3>
                </div>
                <p className="text-xl mt-2">{title}</p>
                <p className="text-sm text-gray-600">
                    Excellent! You have agreed all of the statements, click Mark As Complete to complete your progress
                </p>
            </div>
            <div className="flex justify-center">
                <button onClick={onComplete} className="text-sm bg-red-600 hover:bg-red-700 text-white w-full h-15">
                    <span><FontAwesomeIcon icon={faCheck}size="sm" className="w-4 h-4 mr-1 text-white"/></span>Mark As Complete
                </button>
                <button onClick={onSkip} className="w-full text-sm bg-white hover:bg-gray-200 border h-15">
                    <span><FontAwesomeIcon icon={faShare}size="sm" className="w-4 h-4 mr-1"/></span>Skip For Now
                </button>
            </div>
        </Modal>
    );
}
