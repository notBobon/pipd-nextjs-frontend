"use client";

import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faCloudUpload, faCircleInfo, faCircleUser } from "@fortawesome/free-solid-svg-icons";

interface ReferenceMaterial {
    id: string;
    name: string;
    description: string;
    type: string;
    tags: string[];
    cpdPoints: string;
    mobileFriendly: boolean;
    inheritStatus: boolean;
    hours: number;
    minutes: number;
    fileName: string;
}

interface ReferenceMaterialsProps {
    onNext: (materials: ReferenceMaterial[]) => void;
    onBack: () => void;
}

export default function ReferenceMaterials({ onNext, onBack }: ReferenceMaterialsProps) {
    const [added, setAdded] = useState<ReferenceMaterial[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<Partial<ReferenceMaterial>>({
        tags: [],
        mobileFriendly: false,
        hours: 0,
        minutes: 0,
    });
    const [importFile, setImportFile] = useState<File | null>(null);

    // file input only for demo: stores file name
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setForm(f => ({ ...f, fileName: file.name }));
        if (file) {
            setImportFile(file);
        }
    };

    const onSave = () => {
        if (!form.name || !form.fileName) return;
        const newMat: ReferenceMaterial = {
            id: Date.now().toString(),
            name: form.name!,
            description: form.description || "",
            type: form.type || "Document",
            tags: form.tags || [],
            cpdPoints: form.cpdPoints || "",
            mobileFriendly: form.mobileFriendly || false,
            inheritStatus: form.inheritStatus || false,
            hours: form.hours || 0,
            minutes: form.minutes || 0,
            fileName: form.fileName!,
        };
        setAdded(a => [...a, newMat]);
        setShowForm(false);
        // reset form
        setForm({ tags: [], mobileFriendly: false, hours: 0, minutes: 0 });
    };

    // remove an added assessment
    const removeReferenceMaterial = (idx: number) =>
        setAdded((a) => a.filter((_, i) => i !== idx));

    return (
        <div className="border border-gray-300 rounded-lg bg-white space-y-6">
            {/* ────────────────────────────────────────────── */}
            {/*  2) Info Banner di Bawah Stepper             */}
            {/* ────────────────────────────────────────────── */}
            <div className="flex items-center gap-2  bg-gray-100 px-4 py-3 text-sm text-gray-700 h-18">
                <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="font-medium">
                        Add learning materials that support the curriculum
                    </p>
                    <p className="text-xs text-gray-600">
                        Upload files such as PDFs, videos, or slides that learners will access as part of their learning process
                    </p>
                </div>
            </div>

            {/* ── Added Reference Materials ─────────────────────────────────────────── */}

            <div className="px-6">
                <p className="text-regular font-bold text-gray-700 mb-5">
                    Added Reference Materials
                </p>
                <div className="flex flex-wrap gap-2">
                    {added.map((a, idx) => (
                        <div
                            key={idx}
                            className="flex items-center space-x-2 border border-red-600 bg-red-50 text-red-600 text-sm font-semibold px-3 py-2 rounded-xl h-18 w-60 justify-between"
                        >
                            <span>{a.name}</span>
                            <button
                                onClick={() => removeReferenceMaterial(idx)}
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
                        <span>Add New Reference Material</span>
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                </div>
            </div>

            {/* form */}
            {showForm && (
                <div>
                    <div className="space-y-4 px-6">
                        <p className="text-regular font-bold text-gray-700 mb-5">
                            Create Reference Material
                        </p>
                        <div className="grid grid-cols-12 gap-4">
                            {/* name */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.name || ""}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            {/* tags */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                                <label className="block text-sm font-medium text-gray-700">Tags</label>
                                <input
                                    type="text"
                                    placeholder="Add a Tag"
                                    value={form.tags?.join(", ") || ""}
                                    onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(",").map(t => t.trim()) }))}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
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
                                    value={form.description || ""}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    rows={4}
                                    className="mt-1 block w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                            </div>

                            {/* cpd + mobile */}
                            <div className="col-span-12 lg:col-span-4 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        CPD Points
                                    </label>
                                    <input
                                        type="text"
                                        value={form.cpdPoints || ""}
                                        onChange={e => setForm(f => ({ ...f, cpdPoints: e.target.value }))}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    />
                                </div>
                                <label className="inline-flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.mobileFriendly || false}
                                        onChange={e => setForm(f => ({ ...f, mobileFriendly: e.target.checked }))}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Mobile & Tablet Friendly</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 px-6 mt-9">
                        <p className="text-regular font-bold text-gray-700 mb-5">
                            Reference Material Resource
                        </p>
                        <div className="grid grid-cols-12 gap-4">
                            {/* resource type */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Type
                                </label>
                                <select
                                    value={form.type || "Document"}
                                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    <option>Document</option>
                                    <option>Video</option>
                                    <option>Slide</option>
                                </select>
                                {/* File Drop / Upload Area */}
                                <div className="mt-4">
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
                                                    <p className="text-xs text-gray-500">Accepts PDF,DOCX,PPTX</p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept=".pdf,.docx,.pptx"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                            </div>

                            {/* seat time */}
                            <div className="ccol-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seat Time
                                </label>
                                <p className="text-xs text-gray-600 mb-5">
                                    Specified time will be considered for calculating the man hours
                                </p>
                                <div className="flex flex-row space-x-2 mb-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Hours
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={form.hours || 0}
                                            onChange={e => setForm(f => ({ ...f, hours: Number(e.target.value) }))}
                                            className="w-30 mt-1 block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                            placeholder="Hours"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Minutes
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            max={59}
                                            value={form.minutes || 0}
                                            onChange={e => setForm(f => ({ ...f, minutes: Number(e.target.value) }))}
                                            className="w-30 mt-1 block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                            placeholder="Minutes"
                                        />
                                    </div>
                                </div>

                                <div className="w-80 mb-5">
                                    <label className="inline-flex items-center mt-2 sm:mt-0">
                                        <input
                                            type="checkbox"
                                            checked={form.inheritStatus || false}
                                            onChange={e => setForm(f => ({ ...f, inheritStatus: e.target.checked }))}
                                            className="form-checkbox text-red-600"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            Inherit Status
                                        </span>
                                    </label>
                                    <p className="ml-5 text-xs text-gray-700">
                                        Enabling this would Sync the completion status and completion date across curriculums
                                    </p>
                                </div>

                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Instructors
                                    </label>
                                    <p className="text-xs text-gray-600 mb-4">
                                        Map multiple instructors wherein they can reply learner queries and work on evaluations
                                    </p>
                                    <button className="text-sm text-red-700 underline flex items-center gap-1">
                                        <FontAwesomeIcon icon={faCircleUser} /> Add Instructors
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-4">

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