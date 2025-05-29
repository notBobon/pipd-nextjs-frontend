"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faClock, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faComments, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface Item {
    type: string;
    title: string;
    duration: string;
}

interface CurriculumTabsProps {
    enroll: boolean;
    items: Item[];
    completedDocs: number[];
    completedSurveys: number[];
    onStart: (
        type: "document" | "assessment" | "survey",
        index: number
    ) => void;
}

export default function CurriculumTabs({
    enroll,
    items,
    completedDocs,
    completedSurveys,
    onStart,
}: CurriculumTabsProps) {
    const tabs = ["Contents", "About"] as const;
    const [active, setActive] = useState<typeof tabs[number]>("Contents");

    return (
        <div className="w-full">
            {/* Tab nav */}
            <nav className="flex space-x-8 border-b w-[700px]">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={
                            "pb-2 font-medium text-gray-700 " +
                            (active === tab
                                ? "border-b-2 border-red-600 text-red-600"
                                : "hover:text-gray-900")
                        }
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {/* Panels */}
            <div className="mt-4">
                {/* Contents Panel */}
                {active === "Contents" && (
                    <div className="rounded-2xl bg-white p-4 w-[700px]">
                        <p className="mb-4 text-sm text-gray-600">
                            We have{' '}
                            <span className="font-semibold text-gray-800">
                                {items.length} items
                            </span>{' '}
                            available for you
                        </p>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-8">
                                    {/* left part: icon + text */}
                                    <div className="flex items-center space-x-4">
                                        {/* bullet icon */}
                                        {completedDocs.includes(i) ? (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faCircleCheck}
                                                    size="xl"
                                                    className="w-8 h-8 text-red-700 mt-1"
                                                />
                                                <span className="relative right-6 top-1 h-2 w-2 rounded-full bg-orange-500">
                                                    <span className="absolute inline-flex w-full h-full bg-orange-500 rounded-full opacity-75 animate-ping"></span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faCircleRight}
                                                    size="xl"
                                                    className="w-8 h-8 text-gray-300 mt-1"
                                                />
                                                <span className="relative right-6 top-1 h-2 w-2 rounded-full bg-orange-500">
                                                    <span className="absolute inline-flex w-full h-full bg-orange-500 rounded-full opacity-75 animate-ping"></span>
                                                </span>
                                            </>
                                        )}
                                        {/* texts */}
                                        <div>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {item.title}
                                            </p>
                                            <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                                <span>{item.type}</span>
                                                <div className="inline-flex items-center gap-1">
                                                    <FontAwesomeIcon
                                                        icon={faClock}
                                                        className="w-3 h-3 text-gray-500"
                                                    />
                                                    <span>{item.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {enroll && item.type === "Reference Material" && (
                                        completedDocs.includes(i) ? (
                                            <div className="flex items-center justify-between w-[200px]">
                                                <span className="inline-flex items-center px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium">
                                                    Completed
                                                </span>
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between w-[200px]">
                                                <button
                                                    onClick={() => onStart("document", i)}
                                                    className="px-3 py-2 bg-red-600 text-white font-medium text-sm rounded-lg"
                                                >
                                                    Read Document
                                                </button>
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </div>
                                        )
                                    )}

                                    {enroll && item.type === "Assessment" && (
                                        completedDocs.includes(i) ? (
                                            <div className="flex items-center justify-between w-[200px]">
                                                <div className="flex flex-row gap-4">
                                                    <button className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-100">
                                                        <FontAwesomeIcon
                                                            icon={faChartLine}
                                                            className="w-5 h-5"
                                                        />
                                                    </button>
                                                    <button className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-100">
                                                        <FontAwesomeIcon
                                                            icon={faComments}
                                                            className="w-5 h-5"
                                                        />
                                                    </button>
                                                </div>
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between w-[200px]">
                                                <button
                                                    onClick={() => onStart("assessment", i)}
                                                    className="px-3 py-2 bg-red-600 text-white font-medium text-sm rounded-lg hover:bg-red-700"
                                                >
                                                    Start Assessment
                                                </button>
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </div>
                                        )
                                    )}

                                    {/* Survey button --> conditionally Completed */}
                                    {enroll && item.type === "Survey" && (
                                        completedSurveys.includes(i)
                                            ? (
                                                <div className="flex items-center justify-between w-[200px]">
                                                    <span className="px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm">
                                                        Completed
                                                    </span>
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between w-[200px]">
                                                    <button
                                                        onClick={() => onStart("survey", i)}
                                                        className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                                                    >
                                                        Start Survey
                                                    </button>
                                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                                </div>
                                            )
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* About Panel */}
                {active === "About" && (
                    <div className="rounded-2xl bg-white p-6 w-max-[400px] space-y-2">
                        <div className="">
                            <h3 className="mb-4 text-md font-semibold text-gray-800 dark:text-white">
                                Overview
                            </h3>
                            <p className="text-sm text-gray-600">
                                This Curriculum is an example of a Curriculum that
                                includes Reference Material, Assessment and Survey in the LMS
                            </p>
                        </div>
                        <div className="">
                            <h3 className="mb-4 text-md font-semibold text-gray-800 dark:text-white">
                                Overview
                            </h3>
                            <p className="text-sm text-gray-600">
                                This Curriculum is an example of a Curriculum that
                                includes Reference Material, Assessment and Survey in the LMS
                            </p>
                        </div>
                        <div className="">
                            <h3 className="mb-4 text-md font-semibold text-gray-800 dark:text-white">
                                Overview
                            </h3>
                            <p className="text-sm text-gray-600">
                                This Curriculum is an example of a Curriculum that
                                includes Reference Material, Assessment and Survey in the LMS
                            </p>
                        </div>
                        <div className="">
                            <h3 className="mb-4 text-md font-semibold text-gray-800 dark:text-white">
                                Overview
                            </h3>
                            <p className="text-sm text-gray-600">
                                This Curriculum is an example of a Curriculum that
                                includes Reference Material, Assessment and Survey in the LMS
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
