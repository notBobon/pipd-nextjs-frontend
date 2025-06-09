// components/curriculum/builder/StepCurriculum.tsx
"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCaretDown, faCaretUp, faCircleInfo, faCircleUser, faList, faReply, faShare, faSyncAlt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface CurriculumForm {
    name: string;
    tags: string[];
    referenceTitle: string;
    description: string;
    learningLevel: string;
    curriculumType: string;
    baseCategories: string[];
    subCategories: string[];
    startsOn: string;
    endsOn: string;
    durationTags: string[];
    expiryCriteria: string;
    scoreCriteria: string;
    costPerPerson: string;
    certificateAttachment: string;
    showFeedback: string;
    hideScore: boolean;
    showSummary: boolean;
    accessRights: Record<string, boolean>;
    specificAdminsAll: boolean;
    skillsTab: "competency" | "compliance";
    availableSkills: string[];
    selectedSkills: string[];
    availableSkillLevels: string[];
    selectedSkillLevels: string[];
    otherSettings: {
        showSummary: boolean;
        markFeatured: boolean;
        access: string;
        status: string;
    };
}

interface CurriculumProps {
    onNext: (data: CurriculumForm) => void;
    onBack: () => void;
}

export default function Curriculum({ onNext, onBack }: CurriculumProps) {
    const [form, setForm] = useState<CurriculumForm>({
        name: "",
        tags: [],
        referenceTitle: "",
        description: "",
        learningLevel: "",
        curriculumType: "",
        baseCategories: [],
        subCategories: [],
        startsOn: "",
        endsOn: "",
        durationTags: [],
        expiryCriteria: "",
        scoreCriteria: "",
        costPerPerson: "",
        certificateAttachment: "No",
        showFeedback: "Yes",
        hideScore: false,
        showSummary: false,
        accessRights: {
            read: false,
            edit: false,
            delete: false,
            build: false,
            autoAssignmentRules: false,
            learningGroups: false,
            deliveryAccess: false,
        },
        specificAdminsAll: true,
        skillsTab: "competency",
        availableSkills: ["Communication Skills", "Design Skills", "English Skills"],
        selectedSkills: [],
        availableSkillLevels: ["Level 1", "Level 2", "Level 3"],
        selectedSkillLevels: [],
        otherSettings: {
            showSummary: false,
            markFeatured: false,
            access: "Public",
            status: "Available",
        },
    });

    const handleChange = (k: keyof CurriculumForm, v: any) =>
        setForm(f => ({ ...f, [k]: v }));

    const toggleAccess = (key: keyof CurriculumForm["accessRights"]) =>
        setForm(f => ({
            ...f,
            accessRights: { ...f.accessRights, [key]: !f.accessRights[key] },
        }));

    const [trackingOpen2, setTrackingOpen2] = useState(false);
    const [trackingOpen3, setTrackingOpen3] = useState(false);
    const [trackingOpen4, setTrackingOpen4] = useState(false);
    const [trackingOpen5, setTrackingOpen5] = useState(false);
    const [trackingOpen6, setTrackingOpen6] = useState(false);



    return (
        <div className="border border-gray-300 rounded-lg bg-white space-y-6">
            {/* ────────────────────────────────────────────── */}
            {/*  2) Info Banner di Bawah Stepper             */}
            {/* ────────────────────────────────────────────── */}
            <div className="flex items-center gap-2  bg-gray-100 px-4 py-3 text-sm text-gray-700 h-18">
                <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="font-medium">
                        Provide the core information of your curriculum
                    </p>
                    <p className="text-xs text-gray-600">
                        Fill in the curriculum title, description, category, and intended audience. This information will appear in the learner’s dashboard
                    </p>
                </div>
            </div>

            {/* ─── GENERAL ─────────────────────────────────────── */}
            <fieldset className="px-6 rounded space-y-4">
                <legend className="text-lg font-bold text-red-600">General</legend>
                <div className="grid grid-cols-12 gap-4">
                    {/* Name */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <label className="block text-sm font-medium text-gray-700">
                            Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => handleChange("name", e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                    </div>

                    {/* Tags */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <label className="block text-sm font-medium text-gray-700">
                            Tags
                        </label>
                        <input
                            type="text"
                            placeholder="Add a Tag"
                            value={form.tags.join(", ")}
                            onChange={e =>
                                handleChange("tags", e.target.value.split(",").map(t => t.trim()))
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                    </div>

                    {/* Reference Title */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <label className="block text-sm font-medium text-gray-700">
                            Reference Title
                        </label>
                        <input
                            type="text"
                            value={form.referenceTitle}
                            onChange={e => handleChange("referenceTitle", e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Learning Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Learning Level</label>
                                <select
                                    value={form.learningLevel}
                                    onChange={e => handleChange("learningLevel", e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    <option value="">--Select--</option>
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                            {/* Curriculum Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Curriculum Type</label>
                                <select
                                    value={form.curriculumType}
                                    onChange={e => handleChange("curriculumType", e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    <option value="">--Select--</option>
                                    <option>Mandatory</option>
                                    <option>Optional</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        {/* Toolbar */}
                        <div className="mt-1 flex space-x-2 border border-b-0 border-gray-300 rounded-t-sm bg-gray-50 px-2 py-1 justify-between">
                            <div>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand("bold")}
                                    className="px-2 py-1 hover:bg-gray-200 rounded"
                                    aria-label="Bold"
                                >
                                    <strong>B</strong>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand("italic")}
                                    className="px-2 py-1 hover:bg-gray-200 rounded"
                                    aria-label="Italic"
                                >
                                    <em>I</em>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand("insertUnorderedList")}
                                    className="px-2 py-1 hover:bg-gray-200 rounded"
                                    aria-label="Bulleted list"
                                >
                                    <FontAwesomeIcon icon={faList} />
                                </button>
                            </div>

                            <div>
                                {/* Character counter */}
                                <p className="text-xs px-2 py-1 text-gray-400 mt-1">
                                    Characters: {form.description.length}/5000
                                </p>
                            </div>

                        </div>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={e => handleChange("description", e.target.value)}
                            className="block w-full border rounded-md border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                    </div>

                    {/* Base / Sub Categories */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5 grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Base Categories</p>
                            <ul className="block h-30 border rounded-md border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm">
                                {["Category 1", "Category 2", "Category 3"].map(c => (
                                    <li key={c}>{c}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Sub Categories</p>
                            <ul className="block h-30 border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm">
                                {["Subcategory 1", "Subcategory 2"].map(sc => (
                                    <li key={sc}>{sc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                    </div>
                </div>
                <hr className="" />
            </fieldset>

            {/* ─── TIME & DURATION ─────────────────────────────── */}
            <fieldset className="px-6 rounded space-y-4">
                <button
                    className="flex items-center gap-2 w-full justify-between"
                    onClick={() => setTrackingOpen2((o) => !o)}
                >
                    <legend className="text-lg font-bold text-red-600">Time</legend>
                    {trackingOpen2 ? (
                        <FontAwesomeIcon icon={faCaretUp} size="lg" className="w-10 h-10 text-gray-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} size="lg" className="w-10 h-10 text-gray-500" />
                    )}
                </button>
                {trackingOpen2 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-6 lg:col-span-5 grid grid-cols-2 justify-between space-x-5 space-y-2">
                            {/* Starts On */}
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Starts On
                                </label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <input
                                        type="date"
                                        value={form.startsOn}
                                        onChange={e => handleChange("startsOn", e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    />
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <FontAwesomeIcon icon={faSyncAlt} />
                                    </button>
                                </div>
                            </div>

                            {/* Ends On */}
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ends On
                                </label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <input
                                        type="date"
                                        value={form.endsOn}
                                        onChange={e => handleChange("endsOn", e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    />
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <FontAwesomeIcon icon={faSyncAlt} />
                                    </button>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="col-span-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Duration (Days)
                                </label>
                                <input
                                    type="text"
                                    value={form.durationTags.join(", ")}
                                    onChange={e =>
                                        handleChange("durationTags", e.target.value.split(",").map(t => t.trim()))
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                />
                                <p className="text-xs p-1 mt-1 text-gray-400 w-full">
                                    Note: Duration is calculated according to the curriculum assigned date or
                                    curriculum start date, whichever greater.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-5 space-y-4">
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                Seat Time
                            </p>
                            <div className="inline-flex items-center gap-2 w-90">
                                <FontAwesomeIcon icon={faTriangleExclamation} size="sm" className="text-red-600" />
                                <p className="text-xs p-1 mt-1 text-gray-700 w-full">
                                    Curriculum Seat Time cannot be modified once curriculum is assigned to any user
                                </p>
                            </div>

                            <div className="flex flex-row items-start gap-4">
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="method"
                                            value="auto"
                                            defaultChecked
                                            className="form-radio text-red-600"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-gray-700">Auto</span>
                                    </label>
                                    <p className="text-sm mt-1 text-gray-700 w-full">Addition of all content duration times</p>
                                </div>

                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="method"
                                            value="manual"
                                            className="form-radio text-red-600"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-gray-700">Manual</span>
                                    </label>

                                    <div className="flex flex-row items-center space-x-2 mb-5">
                                        <div className="mt-1">
                                            <label className="block text-sm text-gray-700 mb-1">
                                                Hours
                                            </label>
                                            <input
                                                type="text"
                                                min={0}
                                                value="00"
                                                onChange={e => setForm(f => ({ ...f, hours: Number(e.target.value) }))}
                                                className="w-30 mt-1 block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                                placeholder="Hours"
                                            />
                                        </div>

                                        <div className="mt-1">
                                            <label className="block text-sm text-gray-700 mb-1">
                                                Minutes
                                            </label>
                                            <input
                                                type="text"
                                                min={0}
                                                max={59}
                                                value="30"
                                                onChange={e => setForm(f => ({ ...f, minutes: Number(e.target.value) }))}
                                                className="w-30 mt-1 block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                                placeholder="Minutes"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <hr className="" />
            </fieldset>

            {/* ─── COST & ATTACHMENT ───────────────────────────── */}
            <fieldset className="px-6 rounded space-y-4">
                <button
                    className="flex items-center gap-2 w-full justify-between"
                    onClick={() => setTrackingOpen3((o) => !o)}
                >
                    <legend className="text-lg font-bold text-red-600">Cost & Settings</legend>
                    {trackingOpen3 ? (
                        <FontAwesomeIcon icon={faCaretUp} size="lg" className="w-10 h-10 text-gray-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} size="lg" className="w-10 h-10 text-gray-500" />
                    )}
                </button>

                {trackingOpen3 && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                            <label className="block text-sm font-medium text-gray-700">Expiry Criteria</label>
                            <select
                                value={form.expiryCriteria}
                                onChange={e => handleChange("expiryCriteria", e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                            >
                                <option value="">--Select--</option>
                                <option>Short</option>
                                <option>Normal</option>
                                <option>Long</option>
                            </select>
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-7">
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                            <label className="block text-sm font-medium text-gray-700">Score Criteria</label>
                            <select
                                value={form.scoreCriteria}
                                onChange={e => handleChange("scoreCriteria", e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                            >
                                <option value="">--Select--</option>
                                <option>Light</option>
                                <option>Normal</option>
                                <option>Heavy</option>
                            </select>
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-7">
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-5 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Cost (Per Person)</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={form.costPerPerson}
                                        onChange={e => handleChange("costPerPerson", e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                    />
                                    <span className="font-medium">INR</span>
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-medium">Certificate Attachment</label>
                                <select
                                    value={form.certificateAttachment}
                                    onChange={e => handleChange("certificateAttachment", e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                                >
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                <hr />
            </fieldset>

            {/* ─── ACCESS RIGHTS ──────────────────────────────── */}
            <fieldset className="px-6 rounded space-y-4">
                <button
                    className="flex items-center gap-2 w-full justify-between"
                    onClick={() => setTrackingOpen4((o) => !o)}
                >
                    <legend className="text-lg font-bold text-red-600">Access Rights</legend>
                    {trackingOpen4 ? (
                        <FontAwesomeIcon icon={faCaretUp} size="lg" className="w-10 h-10 text-gray-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} size="lg" className="w-10 h-10 text-gray-500" />
                    )}
                </button>
                {trackingOpen4 && (
                    <div className="grid grid-cols-12 gap-4">
                        {Object.entries(form.accessRights).map(([key, val]) => (
                            <div
                                key={key}
                                className="col-span-6 sm:col-span-4 lg:col-span-3 inline-flex items-center"
                            >
                                <div>
                                    <label
                                        className="inline-flex items-center mt-2 sm:mt-0"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={val}
                                            onChange={() => toggleAccess(key as any)}
                                            className="form-checkbox text-red-600"
                                        />
                                        <span className="ml-2 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                    </label>
                                    {key === "read" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Authorize to view
                                        </p>
                                    }
                                    {key === "autoAssignmentRules" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Allow to use in assignment Rules
                                        </p>
                                    }
                                    {key === "edit" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Authorize to change details
                                        </p>
                                    }
                                    {key === "learningGroups" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Authorize to assign through Learning Group
                                        </p>
                                    }
                                    {key === "delete" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Authorize to delete entity
                                        </p>
                                    }
                                    {key === "deliveryAccess" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Authorize to change delivery access
                                        </p>
                                    }
                                    {key === "build" &&
                                        <p className="ml-5 text-xs text-gray-700">
                                            Authorize to change learning contents
                                        </p>
                                    }
                                </div>
                            </div>
                        ))}

                        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                            <div className="flex items-center gap-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Provide access to specific Administrators
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={form.specificAdminsAll}
                                        onChange={e => handleChange("specificAdminsAll", e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="block text-sm text-gray-700 ml-1">All</span>
                                </label>
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <FontAwesomeIcon icon={faCircleUser} size="2xl" className="text-red-600" />
                                <FontAwesomeIcon icon={faCircleUser} size="2xl" className="text-green-600" />
                                <FontAwesomeIcon icon={faCircleUser} size="2xl" className="text-yellow-600" />
                                <FontAwesomeIcon icon={faCircleUser} size="2xl" className="text-blue-600" />
                                <FontAwesomeIcon icon={faCircleUser} size="2xl" className="text-gray-600" />
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-6 lg:col-span-1">
                        </div>
                    </div>
                )}
                <hr />
            </fieldset >

            {/* ─── SKILLS TAB ──────────────────────────────────── */}
            <fieldset className="px-6 rounded space-y-4" >
                <button
                    className="flex items-center gap-2 w-full justify-between"
                    onClick={() => setTrackingOpen5((o) => !o)}
                >
                    <legend className="text-lg font-semibold text-red-600">Skills</legend>
                    {trackingOpen5 ? (
                        <FontAwesomeIcon icon={faCaretUp} size="lg" className="w-10 h-10 text-gray-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} size="lg" className="w-10 h-10 text-gray-500" />
                    )}
                </button>
                {trackingOpen5 && (
                    <div className="flex flex-col">
                        <div className="flex">
                            {["competency", "compliance"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => handleChange("skillsTab", tab as any)}
                                    className={`px-4 py-2 rounded-t ${form.skillsTab === tab
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {tab[0].toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col bg-gray-200 border border-gray-300 px-4 py-2 space-y-5">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-4">
                                    <p className="text-sm font-medium">Available Skills</p>
                                    <ul className="mt-1 border border-gray-800 rounded-md h-32 overflow-auto p-2 bg-white">
                                        {form.availableSkills.map(s => (
                                            <li key={s}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4 mb-4">
                                <div className="col-span-4">
                                    <p className="text-sm font-medium">Skill Levels</p>
                                    <ul className="mt-1 border border-gray-800 rounded-md h-32 overflow-auto p-2 bg-white">
                                        {form.availableSkillLevels.map(s => (
                                            <li key={s}>{s}</li>
                                        ))}
                                    </ul>

                                </div>

                                <div className="col-span-1 flex flex-col items-center justify-center space-y-2">
                                    <FontAwesomeIcon icon={faShare} className="text-green-600 mt-2 justify-end cursor-pointer" />
                                    <FontAwesomeIcon icon={faReply} className="text-red-600 mt-2 cursor-pointer" />
                                </div>

                                <div className="col-span-4">
                                    <p className="text-sm font-medium">Selected Skill Levels</p>
                                    <ul className="mt-1 border border-gray-800 rounded-md h-32 overflow-auto p-2 bg-white">
                                        {form.selectedSkillLevels.map(sl => (
                                            <li key={sl}>{sl}</li>
                                        ))}
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </div>
                )}
                <hr />
            </fieldset >

            {/* ─── OTHER SETTINGS ─────────────────────────────── */}
            <fieldset className="px-6 rounded space-y-4" >
                <button
                    className="flex items-center gap-2 w-full justify-between"
                    onClick={() => setTrackingOpen6((o) => !o)}
                >
                    <legend className="text-lg font-semibold text-red-600">Other Settings</legend>
                    {trackingOpen6 ? (
                        <FontAwesomeIcon icon={faCaretUp} size="lg" className="w-10 h-10 text-gray-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} size="lg" className="w-10 h-10 text-gray-500" />
                    )}
                </button>
                {trackingOpen6 && (
                    <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <label className="inline-flex items-center mt-2 sm:mt-0">
                            <input
                                type="checkbox"
                                checked={form.otherSettings.showSummary}
                                onChange={e =>
                                    setForm(f => ({
                                        ...f,
                                        otherSettings: { ...f.otherSettings, showSummary: e.target.checked }
                                    }))
                                }
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

                    <div className="col-span-12 sm:col-span-6 lg:col-span-7">
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                        <label className="inline-flex items-center mt-2 sm:mt-0">
                            <input
                                type="checkbox"
                                checked={form.otherSettings.markFeatured}
                                onChange={e =>
                                    setForm(f => ({
                                        ...f,
                                        otherSettings: { ...f.otherSettings, markFeatured: e.target.checked }
                                    }))
                                }
                                className="form-checkbox text-red-600"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">
                                Mark as Featured
                            </span>
                        </label>
                        <p className="ml-5 text-xs text-gray-700">
                            Promote this curriculum as hero and increase its reach
                        </p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-7">
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-5 grid grid-cols-2 gap-4">
                        {/* Access */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Access</label>
                            <select
                                value={form.otherSettings.access}
                                onChange={e =>
                                    setForm(f => ({
                                        ...f,
                                        otherSettings: { ...f.otherSettings, access: e.target.value }
                                    }))
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                            >
                                <option value="">Public</option>
                                <option>Private</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={form.otherSettings.status}
                                onChange={e =>
                                    setForm(f => ({
                                        ...f,
                                        otherSettings: { ...f.otherSettings, status: e.target.value }
                                    }))
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                            >
                                <option value="">Available</option>
                                <option>Unavailable</option>
                                <option>Hidden</option>
                            </select>
                        </div>
                    </div>
                </div>
                )}
                <hr />
            </fieldset >

            {/* ─── FOOTER NAV ──────────────────────────────────── */}
            <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-18 w-full mt-6" >
                <button
                    onClick={() => onNext(form)}
                    className="h-10 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Save &amp; Continue
                </button>
                <button
                    onClick={onBack}
                    className="h-10 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                >
                    Back
                </button>
            </div >
        </div >
    );
}
