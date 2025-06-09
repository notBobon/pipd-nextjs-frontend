// app/curriculum/[id]/page.tsx
"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faCircleInfo,
    faEllipsisVertical,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

// Mock data for demonstration. Replace with real data as needed.
const mockCurriculum = {
    title: "Introduction To LMS Design",
    id: "CUR160",
    startsOn: "30/04/2025",
    endsOn: "30/05/2025",
    description: "Please Complete As Soon As Possible",
    access: "Public",
    seatTime: "1 Hour 30 Min",
    numberOfContents: 2,
    assignedLearners: 10,
    duration: "-",
    certificate: "Not Available",
    status: "Available",
    sequentialCompletion: "No",
    learningLevel: "Intermediate",
    curriculumType: "Mandatory",
    categories: "Category 1",
    createdBy: "LMS Teacher",
    averageRating: "-",
    contents: [
        {
            name: "Introduction To LMS Design Reference Material",
            id: "RM012",
            type: "Reference Material",
            instructor: "Sir Pastor",
            status: "Mandatory",
            visible: "Always",
        },
        {
            name: "Introduction To LMS Design Assessment",
            id: "AM010",
            type: "Assessment",
            instructor: "—",
            status: "Mandatory",
            visible: "Always",
        },
    ],
};

export default function CurriculumPage() {
    const c = mockCurriculum;

    return (
        <div className="px-2">
            <div className="min-h-screen bg-white p-6 border border-gray-200 rounded-md">
                {/* ────────────────────────────────────────────── */}
                {/*  Header: Title + Settings Button            */}
                {/* ────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {c.title}
                    </h1>
                    <button className="text-gray-700 border bg-gray-200 hover:bg-gray-300 border-gray-400 hover:underline text-xs h-10 w-15 px-2 py-1 rounded-lg">
                        <div className="flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faGear} size="xl" />
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </button>
                </div>

                {/* ────────────────────────────────────────────── */}
                {/*  Details Grid                                */}
                {/* ────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-8 bg-white rounded-lg">
                    {/* Column 1 */}
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="mt-1 text-gray-800">{c.title}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Curriculum ID</p>
                        <p className="mt-1 text-gray-800">{c.id}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="mt-1 text-gray-800">{c.description}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Access</p>
                        <p className="mt-1 text-gray-800">{c.access}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Seat Time</p>
                        <p className="mt-1 text-gray-800">{c.seatTime}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Number of Contents</p>
                        <p className="mt-1 text-gray-800">{c.numberOfContents}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="mt-1 text-gray-800">{c.duration}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Assigned Learners</p>
                        <p className="mt-1 text-gray-800">{c.assignedLearners}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Starts On</p>
                        <p className="mt-1 text-gray-800">{c.startsOn}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Ends On</p>
                        <p className="mt-1 text-gray-800">{c.endsOn}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Certificate</p>
                        <p className="mt-1 text-gray-800">{c.certificate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="mt-1 text-gray-800">{c.status}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Sequential Completion</p>
                        <p className="mt-1 text-gray-800">{c.sequentialCompletion}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Average Rating</p>
                        <p className="mt-1 text-gray-800">{c.averageRating}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Learning Level</p>
                        <p className="mt-1 text-gray-800">{c.learningLevel}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Curriculum Type</p>
                        <p className="mt-1 text-gray-800">{c.curriculumType}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Categories</p>
                        <p className="mt-1 text-gray-800">{c.categories}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Created By</p>
                        <p className="mt-1 text-gray-800">{c.createdBy}</p>
                    </div>
                </div>

                {/* ────────────────────────────────────────────── */}
                {/*  Contents Table                              */}
                {/* ────────────────────────────────────────────── */}
                <div className="bg-white rounded-lg">
                    <table className="w-full table-fixed text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-300 bg-gray-50 h-14">
                                <th className="w-1/4 px-3 py-2">Content Name</th>
                                <th className="w-1/6 px-3 py-2">Type</th>
                                <th className="w-1/6 px-3 py-2">Instructor</th>
                                <th className="w-1/6 px-3 py-2">Status</th>
                                <th className="w-1/6 px-3 py-2">Visible</th>
                                <th className="w-12 px-3 py-2 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {c.contents.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 h-26 font-medium">
                                    {/* i‐icon next to ID: */}

                                    <td className="px-3 py-2 text-gray-800">
                                        {item.name}
                                        <div className="mt-1 text-xs font-normal text-gray-500">
                                            <FontAwesomeIcon
                                                icon={faCircleInfo}
                                                className="h-4 w-4 text-gray-400 mr-1"
                                            />{item.id}</div>
                                    </td>

                                    <td className="px-3 py-2 gap-2">
                                        <div className="inline-flex gap-2 items-center justify-center align-middle">
                                            {item.type === "Reference Material" ? (
                                                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                                            ) : (
                                                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                                            )}
                                            <span className="text-gray-800">{item.type}</span>
                                        </div>

                                    </td>

                                    <td className="px-3 py-2 text-gray-800">
                                        {item.instructor}
                                    </td>

                                    <td className="px-3 py-2 text-gray-800">{item.status}</td>
                                    <td className="px-3 py-2 text-gray-800">{item.visible}</td>

                                    <td className="px-3 py-2 text-center">
                                        <FontAwesomeIcon
                                            icon={faEllipsisVertical}
                                            className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
