"use client";

import React, { useState, ChangeEvent, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTimes,
    faCircleInfo,
    faForward,
    faBackward,
    faShare,
    faReply,
    faDownload,
    faCloudUpload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Label from "@/components/form/Label";

// Mocked list of “existing” question banks. In a real app, you would fetch this from your API.
const MOCK_EXISTING_BANKS = [
    "Question Banks 1 – Introductory",
    "Question Banks 2 – Test",
    "Question Banks 3 – Mid Exam",
    "Question Banks 4 – Pretest",
    "Question Banks 5 – Final Test",
];

interface QuestionBanksProps {
    onNext: (bank: AddedBank[]) => void;
    onBack: () => void;
}

type AddedBank =
    | { type: "existing"; name: string }
    | { type: "imported"; title: string };

export default function QuestionBanks({ onNext, onBack }: QuestionBanksProps) {
    //
    // ─── STEP 1: “Questions Banks” ───────────────────────────────────────────
    //

    // State holds all banks that have been “added” so far (either existing or imported).
    const [addedBanks, setAddedBanks] = useState<AddedBank[]>([]);

    // When user clicks “Add New Questions,” we show the “Add Question Banks” panel:
    const [showAddPanel, setShowAddPanel] = useState(false);

    // Inside the add-panel: which method is chosen: “existing” or “import”?
    const [method, setMethod] = useState<"existing" | "import">("existing");

    // ─── If method === "existing", we let them pick from available vs selected lists ───
    const [availableBanks, setAvailableBanks] = useState<string[]>(
        MOCK_EXISTING_BANKS
    );
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

    // Move all available → selected
    const addAllBanks = () => {
        setSelectedBanks([...selectedBanks, ...availableBanks]);
        setAvailableBanks([]);
    };

    // Move all selected ← available
    const removeAllBanks = () => {
        setAvailableBanks([...availableBanks, ...selectedBanks]);
        setSelectedBanks([]);
    };

    // ─── If method === "import", we collect title, description, and a file ───
    const [importTitle, setImportTitle] = useState("");
    const [importDescription, setImportDescription] = useState("");
    const [importFile, setImportFile] = useState<File | null>(null);

    // When a user selects or drops a file:
    const onImportFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setImportFile(file);
        }
    };

    // ─── Handlers for “Save & Continue” and “Cancel” inside the Add Panel ───
    const handleSaveContinue = useCallback(() => {
        if (method === "existing") {
            // Add each selected existing bank to addedBanks state
            const newBanks: AddedBank[] = selectedBanks.map((name) => ({
                type: "existing",
                name,
            }));
            setAddedBanks((prev) => [...prev, ...newBanks]);
        } else {
            // Import new: only if title + file are set
            if (importTitle.trim() && importFile) {
                setAddedBanks((prev) => [
                    ...prev,
                    { type: "imported", title: importTitle.trim() },
                ]);
            }
        }
        // Reset all add-panel fields and close it
        setMethod("existing");
        setAvailableBanks(() =>
            MOCK_EXISTING_BANKS.filter(
                (b) => addedBanks.every((ab) => ab.type === "existing"
                    ? ab.name !== b
                    : true)
            )
        );
        setSelectedBanks([]);
        setImportTitle("");
        setImportDescription("");
        setImportFile(null);
        setShowAddPanel(false);
    }, [method, selectedBanks, importTitle, importFile, addedBanks]);

    const handleCancel = useCallback(() => {
        // Just close the panel and reset internal selections
        setMethod("existing");
        setAvailableBanks(() =>
            MOCK_EXISTING_BANKS.filter(
                (b) => addedBanks.every((ab) => ab.type === "existing"
                    ? ab.name !== b
                    : true)
            )
        );
        setSelectedBanks([]);
        setImportTitle("");
        setImportDescription("");
        setImportFile(null);
        setShowAddPanel(false);
    }, [addedBanks]);

    // ─── Remove items from “Added Question Banks” tags ───
    const removeAddedBank = (idx: number) => {
        setAddedBanks((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="border border-gray-300 rounded-lg bg-white space-y-6">

            {/* ────────────────────────────────────────────── */}
            {/*  2) Info Banner di Bawah Stepper             */}
            {/* ────────────────────────────────────────────── */}
            <div className="flex items-center gap-2  bg-gray-100 px-4 py-3 text-sm text-gray-700 h-18">
                <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="font-medium">
                        Choose How You Want To Manage Questions For This Curriculum
                    </p>
                    <p className="text-xs text-gray-600">
                        You can either select existing question banks or create a new one by adding questions manually
                        or uploading them in bulk via Excel
                    </p>
                </div>
            </div>

            {/* ── “Added Question Banks” (Tags + “Add New Questions”) ───────────── */}
            <div className="px-6">
                <p className="text-regular font-bold text-gray-700 mb-5">Added Question Banks</p>
                <div className="flex flex-wrap gap-2">
                    {
                        addedBanks.map((bank, idx) => (
                            <div
                                key={idx}
                                className="flex items-center space-x-2 border border-red-600 bg-red-50 text-red-600 text-sm font-semibold px-3 py-2 rounded-xl h-18 w-60 justify-between"
                            >
                                <span>
                                    {bank.type === "existing" ? bank.name : bank.title}
                                </span>
                                <button
                                    onClick={() => removeAddedBank(idx)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FontAwesomeIcon icon={faTimes} size="sm" />
                                </button>
                            </div>
                        ))
                    }

                    {/* “Add New Questions” button */}
                    <button
                        onClick={() => setShowAddPanel(true)}
                        className="flex items-center space-x-2 border border-red-600 bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-xl hover:bg-red-700 h-18 w-60 justify-between"
                    >
                        <span>Add New Questions</span>
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                    </button>
                </div>
            </div>

            {(/* ── ADD PANEL ──────────────────────────────────────────── */ showAddPanel) && (
                <div className="space-y-6">
                    <hr className="mx-6" />
                    {/* ── “Select Method” area ───────────────────────────────────── */}
                    <div className="px-6">
                        <p className="font-semibold text-gray-700 mb-5">
                            Add Question Banks
                        </p>

                        <div className="flex flex-col items-start gap-4">
                            <p className="text-sm text-gray-700">
                                Select Method:
                            </p>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="method"
                                    value="existing"
                                    checked={method === "existing"}
                                    onChange={() => setMethod("existing")}
                                    className="form-radio text-red-600"
                                />
                                <span className="ml-2 text-sm text-gray-700">Select Existing Question Banks</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="method"
                                    value="import"
                                    checked={method === "import"}
                                    onChange={() => setMethod("import")}
                                    className="form-radio text-red-600"
                                />
                                <span className="ml-2 text-sm text-gray-700">Import New Question Banks</span>
                            </label>
                        </div>
                    </div>

                    <hr className="mx-6" />

                    {/* ── If “Select Existing” ───────────────────────────────────── */}
                    {method === "existing" && (
                        <div className="space-y-4 px-6">
                            <p className="font-semibold text-gray-700 mb-1">
                                Select Existing Question Banks
                            </p>
                            <p className="text-sm text-gray-600">
                                Add Question Bank by selecting existing Question Banks
                            </p>

                            <div className="flex gap-4">
                                {/* Available List */}
                                <div className="flex-1 border border-gray-300 rounded-md overflow-y-auto max-h-42">
                                    <ul>
                                        {availableBanks.map((bank) => (
                                            <li
                                                key={bank}
                                                className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                                            >
                                                <span className="text-sm text-gray-800">{bank}</span>

                                            </li>
                                        ))}
                                        {availableBanks.length === 0 && (
                                            <li className="px-3 py-2 text-sm text-gray-400 italic">No more available banks.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Center Controls */}
                                <div className="flex flex-col gap-2 justify-center px-15">
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={addAllBanks}
                                            className="p-2 rounded hover:bg-gray-100"
                                        >
                                            <FontAwesomeIcon icon={faShare} size="xs" className="text-green-500" />
                                        </button>
                                        <button
                                            onClick={addAllBanks}
                                            className="p-2 rounded hover:bg-gray-100"
                                        >
                                            <FontAwesomeIcon icon={faForward} size="xs" className="text-green-500" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={removeAllBanks}
                                            className="p-2 rounded hover:bg-gray-100"
                                        >
                                            <FontAwesomeIcon icon={faBackward} size="xs" className="text-red-500" />
                                        </button>
                                        <button
                                            onClick={removeAllBanks}
                                            className="p-2 rounded hover:bg-gray-100"
                                        >
                                            <FontAwesomeIcon icon={faReply} size="xs" className="text-red-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Selected List */}
                                <div className="flex-1 border border-gray-300 rounded-md overflow-y-auto max-h-42">
                                    <ul>
                                        {selectedBanks.map((bank) => (
                                            <li
                                                key={bank}
                                                className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                                            >
                                                <span className="text-sm text-gray-800">{bank}</span>

                                            </li>
                                        ))}
                                        {selectedBanks.length === 0 && (
                                            <li className="px-3 py-2 text-sm text-gray-400 italic">
                                                No question banks selected.
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── If “Import New” ───────────────────────────────────────── */}
                    {method === "import" && (
                        <div className="space-y-4 px-6">
                            <p className="font-semibold text-gray-700 mb-1">
                                Import Question Banks
                            </p>
                            <p className="text-sm text-gray-600">
                                Create new question banks by importing a template file
                            </p>

                            <div className="grid grid-cols-12 gap-4">
                                {/* Titel */}
                                <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                    <label
                                        htmlFor="importTitle"
                                        className="block text-sm text-gray-700"
                                    >
                                        Title<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="importTitle"
                                        type="text"
                                        value={importTitle}
                                        onChange={(e) => setImportTitle(e.target.value)}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                                </div>

                                <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                                    <div>
                                        <Label>Templates</Label>
                                        <div className="flex gap-6">
                                            <Link className="inline-flex items-baseline gap-1" href="/teacher/users/bulk">
                                                <FontAwesomeIcon icon={faDownload} size="xs" className="text-red-600" />
                                                <p className="text-sm text-red-600">Your Data</p>
                                            </Link>
                                            <Link className="inline-flex items-baseline gap-1" href="/teacher/users/bulk">
                                                <FontAwesomeIcon icon={faDownload} size="xs" className="text-red-600" />
                                                <p className="text-sm text-red-600">Sample Templates</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                    <label
                                        htmlFor="importDescription"
                                        className="block text-sm text-gray-700"
                                    >
                                        Description<span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="importDescription"
                                        value={importDescription}
                                        onChange={(e) => setImportDescription(e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                                </div>

                                <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                                    {/* File Drop / Upload Area */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Choose File
                                        </label>
                                        <p className="text-xs text-gray-600 mb-4">
                                            Upload your Questions file here to create new question banks
                                        </p>
                                        <div className="flex h-45">
                                            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer hover:border-red-500 hover:bg-red-50">
                                                {importFile ? (
                                                    <div className="text-center space-y-2">
                                                        <FontAwesomeIcon
                                                            icon={faCloudUpload}
                                                            size="2x"
                                                            className="text-red-600"
                                                        />
                                                        <p className="text-lg font-bold text-gray-800">{importFile.name}</p>
                                                        <p className="text-xs text-gray-600"> File Uploaded</p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center space-y-2">
                                                        <FontAwesomeIcon
                                                            icon={faCloudUpload}
                                                            size="2x"
                                                            className="text-red-600"
                                                        />
                                                        <p className="text-lg font-bold text-gray-600">
                                                            Drag & drop <span className="font-normal text-sm">or </span><span className="font-semibold text-sm underline text-red-600">Browse File</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500">Accepts XLSX</p>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept=".xlsx"
                                                    onChange={onImportFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── “Save & Continue” / “Cancel” ────────────────────────────── */}
                    <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-18 w-full">
                        <button
                            onClick={handleSaveContinue}
                            className="h-10 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Save & Continue
                        </button>
                        <button
                            onClick={handleCancel}
                            className="h-10 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {/* footer navigation */}
            {!showAddPanel && (
                <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-20 w-full mt-6">
                    <button
                        onClick={() => onNext(addedBanks)}
                        disabled={addedBanks.length === 0}
                        className={`px-6 py-2 rounded ${addedBanks.length
                            ? "h-12 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            : "h-12 px-4 py-2 bg-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                            }`}
                    >
                        Next Step
                    </button>
                    <button
                        onClick={onBack}
                        className="h-12 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}
