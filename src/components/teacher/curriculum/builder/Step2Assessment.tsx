"use client";

import React, { useState, ChangeEvent, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTimes,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

import {
    faCircleQuestion
} from "@fortawesome/free-regular-svg-icons";

type Assessment = {
    name: string;
    status: string;
    mode: string;
    description: string;
    seatTime: string;
    attempts: number;
    totalSamples: number;
    minimumPass: number;
    cpdPoints: string;
    restrictOnce: boolean;
    inheritStatus: boolean;
    tags: string[];
    instructors: string;
    scoreMode: string;
    marksForCorrect: number;
    deductForIncorrect: number;
    deductForUnattempted: number;
    saqMin: string;
    saqMax: number;
    showFeedback: string;
    hideScore: boolean;
    showSummary: boolean;
    allowExtraAttempt: string;
    extraAttemptEmails: { learner: boolean; approval: boolean };
    selectedBanks: string[];
};

interface AssesmentProps {
    onNext: (assesment: Assessment[]) => void;
    onBack: () => void;
}

const MOCK_EXISTING_BANKS = [
    "Question Banks 1 – Introductory",
    "Question Banks 2 – Test",
    "Question Banks 3 – Mid Exam",
    "Question Banks 4 – Pretest",
    "A01 – Post Test",
];

export default function Assessment({ onNext, onBack }: AssesmentProps) {
    // the list of added assessments
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    // show/hide the “Add New Assessment” form
    const [showForm, setShowForm] = useState(false);
    const [added, setAdded] = useState<Assessment[]>([]);

    // form state:
    const [form, setForm] = useState<Assessment>({
        name: "",
        status: "",
        mode: "",
        description: "",
        seatTime: "00:30",
        attempts: 0,
        totalSamples: 0,
        minimumPass: 0,
        cpdPoints: "",
        restrictOnce: false,
        inheritStatus: false,
        tags: [],
        instructors: "",
        scoreMode: "",
        marksForCorrect: 0,
        deductForIncorrect: 0,
        deductForUnattempted: 0,
        saqMin: "",
        saqMax: 100,
        showFeedback: "Yes",
        hideScore: false,
        showSummary: false,
        allowExtraAttempt: "No",
        extraAttemptEmails: { learner: false, approval: false },
        selectedBanks: [],
    });

    // available vs selected question banks
    const [availableBanks, setAvailableBanks] = useState(MOCK_EXISTING_BANKS);
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

    // generic handler for text/select/number inputs
    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const { name, value, type } = target;
        const checked = (target as HTMLInputElement).checked;

        setForm((f) => ({
            ...f,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? parseFloat(value)
                        : value,
        }));
    };

    // move bank from available → selected
    const addBank = (b: string) => {
        setAvailableBanks((a) => a.filter((x) => x !== b));
        setSelectedBanks((s) => [...s, b]);
    };
    // move bank from selected → available
    const removeBank = (b: string) => {
        setSelectedBanks((s) => s.filter((x) => x !== b));
        setAvailableBanks((a) => [...a, b]);
    };

    // when user clicks Save & Continue
    const onSave = useCallback(() => {
        const newAssessment: Assessment = {
            ...form,
            selectedBanks,
        };
        setAssessments((prev) => [...prev, newAssessment]);
        // reset form + banks + close
        setForm((f) => ({
            ...f,
            name: "",
            description: "",
            selectedBanks: [],
        }));
        setAdded(a => [...a, newAssessment]);
        setAvailableBanks(MOCK_EXISTING_BANKS);
        setSelectedBanks([]);
        setShowForm(false);
    }, [form, selectedBanks]);

    // remove an added assessment
    const removeAssessment = (idx: number) =>
        setAssessments((a) => a.filter((_, i) => i !== idx));

    return (
        <div className="border border-gray-300 rounded-lg bg-white space-y-6">
            {/* ────────────────────────────────────────────── */}
            {/*  2) Info Banner di Bawah Stepper             */}
            {/* ────────────────────────────────────────────── */}
            <div className="flex items-center gap-2  bg-gray-100 px-4 py-3 text-sm text-gray-700 h-18">
                <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="font-medium">
                        Set the foundation for how learner performance will be evaluated
                    </p>
                    <p className="text-xs text-gray-600">
                        Here, you’ll configure the assessment details such as duration, scoring system, and link the relevant question banks
                    </p>
                </div>
            </div>

            {/* ── Added Assessments ─────────────────────────────────────────── */}
            <div className="px-6">
                <p className="text-regular font-bold text-gray-700 mb-5">
                    Added Assessments
                </p>
                <div className="flex flex-wrap gap-2">
                    {assessments.map((a, idx) => (
                        <div
                            key={idx}
                            className="flex items-center space-x-2 border border-red-600 bg-red-50 text-red-600 text-sm font-semibold px-3 py-2 rounded-xl h-18 w-60 justify-between"
                        >
                            <span>{a.name}</span>
                            <button
                                onClick={() => removeAssessment(idx)}
                                className="ml-2 text-red-600 hover:text-red-800"
                            >
                                <FontAwesomeIcon icon={faTimes} size="xs" />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center space-x-2 border border-red-600 bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-xl hover:bg-red-700 h-18 w-60 justify-between"
                    >
                        <span>Add New Assessment</span>
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                </div>
            </div>

            {/* ── Form: Create Assessment ────────────────────────────────────── */}
            {showForm && (
                <div>
                    <div className="space-y-4 px-6">
                        <p className="text-regular font-bold text-gray-700 mb-5">
                            Create Assessment
                        </p>
                        <div className="grid grid-cols-12 gap-4">
                            {/* Name */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            {/* Status */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Status<span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Available", "Hidden", "Archived"].map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mode */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                                <div className="inline-flex justify-between items-center gap-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mode<span className="text-red-500">*</span>
                                    </label>
                                    <FontAwesomeIcon icon={faCircleQuestion} size="xs" />
                                </div>

                                <select
                                    name="mode"
                                    value={form.mode}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Practice Mode", "Test Mode"].map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                <div className="flex justify-between items-center gap-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description<span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-xs text-gray-400 text-right pt-2">800 characters</p>
                                </div>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={onChange}
                                    rows={4}
                                    className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Seat Time */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Seat Time<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="seatTime"
                                            type="time"
                                            value={form.seatTime}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>

                                    {/* Attempts */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Attempts<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="attempts"
                                            type="number"
                                            min={1}
                                            value={form.attempts}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>

                                    {/* Total Samples */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Total Samples<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="totalSamples"
                                            type="number"
                                            min={1}
                                            value={form.totalSamples}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>

                                    {/* Minimum Pass */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Minimum Pass<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="minimumPass"
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={form.minimumPass}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>

                                    {/* CPD Points */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            CPD Points
                                        </label>
                                        <input
                                            name="cpdPoints"
                                            type="number"
                                            value={form.cpdPoints}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>

                                    <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Checkboxes ─────────────────────────────────────────── */}
                        <div className="flex flex-col sm:space-x-8 space-y-5 w-100">
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        name="restrictOnce"
                                        type="checkbox"
                                        checked={form.restrictOnce}
                                        onChange={onChange}
                                        className="form-checkbox text-red-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        Restrict attempt Once Completed
                                    </span>
                                </label>
                                <p className="ml-5 text-xs text-gray-700">
                                    Disallow learners to take another attempt once they pass and completes the assesment
                                </p>
                            </div>

                            <div>
                                <label className="inline-flex items-center mt-2 sm:mt-0">
                                    <input
                                        name="inheritStatus"
                                        type="checkbox"
                                        checked={form.inheritStatus}
                                        onChange={onChange}
                                        className="form-checkbox text-red-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        Inherit Status
                                    </span>
                                </label>
                                <p className="ml-5 text-xs text-gray-700">
                                    Enabling this would Sync the Assessment status across curriculums in My Learning. Once enabled, this option cannot be disabled
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            {/* Tags */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>
                                <input
                                    name="tags"
                                    value={form.tags}
                                    onChange={onChange}
                                    placeholder="Add a Tag"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            {/* Instructors */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Instructors
                                    </label>
                                    <label className="inline-flex items-center mt-2 sm:mt-0">
                                        <input
                                            type="checkbox"
                                            checked={false}
                                            onChange={onChange}
                                            className="form-checkbox text-red-600"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            All
                                        </span>
                                    </label>
                                </div>
                                <select
                                    name="instructors"
                                    value={form.instructors}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Keyword", "None"].map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            {/* Add Score To */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Add Score To<span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="scoreMode"
                                    value={form.scoreMode}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Practice Mode", "Test Mode"].map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                            </div>

                            {/* Instructors Email*/}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">

                                <label className="block text-sm font-medium text-gray-700">
                                    Instructor Email Template
                                </label>

                                <select
                                    name="instructors"
                                    value={form.instructors}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Keyword", "None"].map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                                <div className="grid grid-cols-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Marks For Correct<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="marksForCorrect"
                                            type="number"
                                            value={form.marksForCorrect}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Deduct For Incorrect<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="deductForIncorrect"
                                            type="number"
                                            value={form.deductForIncorrect}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Deduct For Unattempted<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="deductForUnattempted"
                                            type="number"
                                            value={form.deductForUnattempted}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 sm:col-span-2 lg:col-span-6">
                            </div>

                            {/* SAQ Minimum */}
                            <div className="col-span-12 sm:col-span-2 lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    SAQ Minimum
                                </label>
                                <input
                                    name="saqMin"
                                    type="number"
                                    value={form.saqMin}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                />
                            </div>

                            {/* SAQ Maximum */}
                            <div className="col-span-12 sm:col-span-2 lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    SAQ Maximum<span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="saqMax"
                                    type="number"
                                    value={form.saqMax}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                />
                            </div>

                            <div className="col-span-2 sm:col-span-2 lg:col-span-8">
                            </div>

                            {/* Show Feedbacks */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                                <div className="inline-flex justify-between items-center gap-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Show Feedbacks<span className="text-red-500">*</span>
                                    </label>
                                    <FontAwesomeIcon icon={faCircleQuestion} size="xs" />
                                </div>

                                <select
                                    name="showFeedback"
                                    value={form.showFeedback}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Yes", "No"].map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* ── Checkboxes ─────────────────────────────────────────── */}
                        <div className="flex flex-col sm:space-x-8 mt-4 space-y-5 w-100">
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        name="hideScore"
                                        type="checkbox"
                                        checked={form.hideScore}
                                        onChange={onChange}
                                        className="form-checkbox text-red-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        Hide Score and Results from Learners
                                    </span>
                                </label>
                                <p className="ml-5 text-xs text-gray-700">
                                    Score achieved and status of the assessment will not be displayed to the Learners
                                </p>
                            </div>

                            <div>
                                <label className="inline-flex items-center mt-2 sm:mt-0">
                                    <input
                                        name="showSummary"
                                        type="checkbox"
                                        checked={form.showSummary}
                                        onChange={onChange}
                                        className="form-checkbox text-red-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        Show assessment summary to learners
                                    </span>
                                </label>
                                <p className="ml-5 text-xs text-gray-700">
                                    Help your Learners to compare responses with the actual answers
                                </p>
                            </div>
                        </div>

                        {/* ── Additional ─────────────────────────────────────────── */}
                        <div className="flex flex-row sm:space-x-8 mt-6 space-y-5">
                            <div className="w-100">
                                {/* Allow learners to request attempt */}
                                <label className="block text-sm font-medium text-gray-700">
                                    Allow learners to request attempt
                                </label>
                                <select
                                    name="allowExtraAttempt"
                                    value={form.allowExtraAttempt}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    {["Yes", "No"].map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h3 className="text-sm mb-1">Emails regarding an extra attempt</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            name="learner"
                                            type="checkbox"
                                            checked={form.extraAttemptEmails.learner}
                                            onChange={onChange}
                                            className="form-checkbox text-red-600"
                                        />
                                        <span className="ml-2 text-xs font-medium text-gray-700">
                                            Additional attempt request by learner
                                        </span>
                                    </label>

                                    <label className="inline-flex items-center mt-2 sm:mt-0">
                                        <input
                                            name="approval"
                                            type="checkbox"
                                            checked={form.extraAttemptEmails.approval}
                                            onChange={onChange}
                                            className="form-checkbox text-red-600"
                                        />
                                        <span className="ml-2 text-xs font-medium text-gray-700">
                                            Approval/Rejection email to learner
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* ── Question Banks Selection ────────────────────────────── */}
                        <div>
                            <p className="text-regular font-bold text-gray-700 mb-5">
                                Select Question Banks
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {availableBanks.map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => addBank(b)}
                                        className="flex items-center space-x-2 border border-red-600 bg-red-50 text-red-600 text-sm font-semibold px-3 py-2 rounded-xl h-18 w-60 justify-between"
                                    >
                                        <span>{b}</span>
                                        <FontAwesomeIcon icon={faPlus} size="xs" />
                                    </button>
                                ))}
                                {selectedBanks.map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => removeBank(b)}
                                        className="flex items-center mb-6 space-x-2 border border-red-600 bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-xl hover:bg-red-700 h-18 w-60 justify-between"
                                    >
                                        <span>{b}</span>
                                        <FontAwesomeIcon icon={faTimes} size="xs" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── “Save & Continue” / “Cancel” ────────────────────────────── */}
                    <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-18 w-full mt-6">
                        <button
                            onClick={onSave}
                            className="h-10 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Save & Continue
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="h-10 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* footer navigation */}
            {!showForm && (
                <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-20 w-full mt-6">
                    <button
                        onClick={() => onNext(added)}
                        disabled={added.length === 0}
                        className={`px-6 py-2 rounded ${added.length
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
