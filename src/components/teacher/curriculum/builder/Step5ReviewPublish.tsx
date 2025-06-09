// components/curriculum/steps/ReviewPublishStep.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    faSort,
    faBackwardStep,
    faPlay,
    faForwardStep,
    faCircleInfo,
    faChevronDown,
    faPlus,
    faPen,
    faEllipsisVertical,
    faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssignLearnersModal from "@/components/teacher/curriculum/AssignLearners";

interface ContentItem {
    id: string;
    title: string;
    code: string;
    type: "Reference Material" | "Assessment";
    seatTime: string;
    mandatory: boolean;
}

interface Learner {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    status: string;
}

const allPossibleLearners: Learner[] = [
    { id: "U001", name: "Andi Pratama", email: "andi@example.com", username: "andipratama", role: "Learner", status: "Active" },
    { id: "U002", name: "Budi Santoso", email: "budi@example.com", username: "budisantoso", role: "Learner", status: "Active" },
    // … dst
];

interface ReviewPublishProps {
    onBack: () => void;
}

export default function ReviewPublish({ onBack }: ReviewPublishProps) {
    // ─── MOCK DATA ─────────────────────────────────────────────
    const contents: ContentItem[] = [
        {
            id: "1",
            title: "Introduction To LMS Design Reference Material",
            code: "RM012",
            type: "Reference Material",
            seatTime: "1 hour",
            mandatory: true,
        },
        {
            id: "2",
            title: "Introduction To LMS Design Assessment",
            code: "AM010",
            type: "Assessment",
            seatTime: "30 min",
            mandatory: true,
        },
    ];

    const learners: Learner[] = [
        {
            id: "212320",
            name: "Alan Spencer",
            email: "alan@company.co.id",
            username: "alan.spencer",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212321",
            name: "Brandon Walker Nielsman",
            email: "brandon@company.co.id",
            username: "brandon.n",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212324",
            name: "Chris Rose",
            email: "chris@company.co.id",
            username: "chris.rose",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212325",
            name: "Derrick Pratt Johnson",
            email: "derrickjohnson@company.co.id",
            username: "derrick.j",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212326",
            name: "Eva Chen",
            email: "eva@company.co.id",
            username: "eva.chen",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212327",
            name: "Felix Grant",
            email: "felix@company.co.id",
            username: "felix.g",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212328",
            name: "Gina Torres",
            email: "gina@company.co.id",
            username: "gina.t",
            role: "Learner",
            status: "Active",
        },
        {
            id: "212329",
            name: "Harry Mills",
            email: "harry@company.co.id",
            username: "harry.m",
            role: "Learner",
            status: "Active",
        },
    ];

    const curriculumInfo = {
        name: "Introduction To LMS Design",
        id: "CUR160",
        description: "Please Complete As Soon As Possible",
        access: "Public",
        startsOn: "30/04/2025",
        endsOn: "30/05/2025",
        seatTime: "1 Hour 30 Min",
        numberOfContents: contents.length,
        assignedLearners: learners.length,
    };
    // ────────────────────────────────────────────────────────────

    // pagination state for learners table
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(4);
    // state assigned di halaman review
    const [assigned, setAssigned] = useState<Learner[]>(learners);
    // control modal
    const [showAssignModal, setShowAssignModal] = useState(false);

    // handler yang kita lempar ke modal
    const handleAssign = (newOnes: Learner[]) => {
        // append, tapi juga filter duplikat biar ga double
        setAssigned(prev => {
            const combined = [...prev, ...newOnes];
            // dedupe by id
            const seen = new Set<string>();
            return combined.filter(l => {
                if (seen.has(l.id)) return false;
                seen.add(l.id);
                return true;
            });
        });
        setShowAssignModal(false);
    };

    const totalLearners = assigned.length;
    const totalPages = Math.max(1, Math.ceil(totalLearners / perPage));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalLearners);
    const visibleLearners = assigned.slice(startIndex, endIndex);

    return (
        <div className="border border-gray-300 rounded-lg bg-white space-y-8">
            {/* ────────────────────────────────────────────── */}
            {/*  2) Info Banner di Bawah Stepper             */}
            {/* ────────────────────────────────────────────── */}
            <div className="flex items-center gap-2  bg-gray-100 px-4 py-3 text-sm text-gray-700 h-18">
                <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5 text-gray-500" />
                <div>
                    <p className="font-medium">
                        Organize and finalize your curriculum
                    </p>
                    <p className="text-xs text-gray-600">
                        Organize content to structure the curriculum flow, assign learners, and publish when you&apos;re ready
                    </p>
                </div>
            </div>

            {/* Contents Section */}
            <section className="space-y-5 px-6">
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <legend className="text-lg font-bold text-red-600">Contents</legend>
                        <p className="text-sm text-gray-500">
                            Arrange Contents To Design The Learning Experience
                        </p>
                    </div>

                    <button className="inline-flex justify-center items-center gap-4 h-12 w-41 px-2 py-2 border border-red-600 rounded-lg bg-red-600 text-white hover:bg-red-700">
                        <FontAwesomeIcon size="sm" icon={faPlus} />
                        <span className="text-sm">Add Content</span>
                        <FontAwesomeIcon size="sm" icon={faChevronDown} />
                    </button>
                </div>


                <table className="w-full text-sm">
                    <thead className="border-b">
                        <tr className="text-left">
                            <th className="py-2">Content Name</th>
                            <th className="py-2">
                                Type
                            </th>
                            <th className="py-2">
                                Seat Time
                            </th>
                            <th className="py-2">Mandatory</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map((c) => (
                            <tr key={c.id} className="border-b font-medium">
                                <td className="py-3">
                                    <span className="block">{c.title}</span>
                                    <div className="inline-flex items-center gap-1 mt-2">
                                        <FontAwesomeIcon icon={faCircleInfo} size="sm" className="text-gray-500" />
                                        <span className="text-xs text-gray-500">{c.code}</span>
                                    </div>

                                </td>
                                <td className="py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 text-sm ${c.type === "Reference Material"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                            }`}
                                    >
                                        ● <span className="text-gray-800">{c.type}</span>
                                    </span>
                                </td>
                                <td className="py-3">{c.seatTime}</td>
                                <td className="py-3 px-6">
                                    {c.mandatory ? "✔︎" : ""}
                                </td>
                                <td className="py-3 space-x-2">
                                    <button className="px-2 py-1 h-9 w-10 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
                                        <FontAwesomeIcon icon={faPen} size="lg" className="w-4 h-4" />
                                    </button>
                                    <button className="px-2 py-1 h-9 w-10 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
                                        <FontAwesomeIcon icon={faSort} size="lg" className="w-4 h-4" />
                                    </button>
                                </td>
                                <td>
                                    <button className="px-2 py-1 rounded text-xs">
                                        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Assigned Learners Section */}
            <section className="space-y-5 px-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <legend className="text-lg font-bold text-red-600">Assigned Learners ({assigned.length})</legend>
                        <p className="text-sm text-gray-500">
                            Assign Learners to do curriculum
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAssignModal(true)}
                        className="inline-flex justify-center items-center gap-4 h-12 w-44 px-2 py-2 border border-red-600 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        <FontAwesomeIcon size="sm" icon={faPlus} />
                        <span className="text-sm">Assign Learner</span>
                        <FontAwesomeIcon size="sm" icon={faUpRightFromSquare} />
                    </button>
                </div>

                <table className="w-full text-sm">
                    <thead className="border-b">
                        <tr className="text-left h-18 font-medium text-gray-700">
                            <th className="py-2">
                                Unique ID{" "}
                                <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                            </th>
                            <th className="py-2">
                                Name{" "}
                                <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                            </th>
                            <th className="py-2">
                                Email{" "}
                                <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                            </th>
                            <th className="py-2">
                                Username{" "}
                                <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                            </th>
                            <th className="py-2">
                                Role{" "}
                                <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                            </th>
                            <th className="py-2">
                                Status{" "}
                                <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-400" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleLearners.map((l) => (
                            <tr key={l.id} className="border-b h-20">
                                <td className="py-3">{l.id}</td>
                                <td className="py-3">{l.name}</td>
                                <td className="py-3">{l.email}</td>
                                <td className="py-3">{l.username}</td>
                                <td className="py-3">{l.role}</td>
                                <td className="py-3">{l.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-2 flex items-center justify-end text-sm text-gray-600 gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(1)}
                            disabled={currentPage === 1}
                            className="p-1"
                        >
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1"
                        >
                            <FontAwesomeIcon icon={faPlay} className="rotate-180" />
                        </button>
                        <span>
                            Showing {startIndex + 1}–{endIndex} of {totalLearners}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1"
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                        <button
                            onClick={() => setPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-1"
                        >
                            <FontAwesomeIcon icon={faForwardStep} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Show</span>
                        <input
                            type="number"
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            className="w-12 border px-1 py-0.5 rounded text-sm"
                        />
                        <span>Records</span>
                        <Link href="/teacher/users" className="ml-4 underline text-red-600">
                            View All
                        </Link>
                    </div>
                </div>
            </section>

            {/* Curriculum Summary */}
            <section className="space-y-5 px-6">
                <legend className="text-lg font-bold text-red-600">
                    Curriculum Summary
                </legend>

                <div className="grid grid-cols-12 gap-4 text-sm font-semibold">
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <p className="font-medium text-gray-700">Name</p>
                        <p className="ml-1 mt-1">{curriculumInfo.name}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                        <p className="font-medium text-gray-700">Curriculum ID</p>
                        <p className="ml-1 mt-1"><FontAwesomeIcon icon={faCircleInfo} size="sm" className="mr-1"/>{curriculumInfo.id}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                        <p className="font-medium text-gray-700">Starts On</p>
                        <p className="ml-1 mt-1">{curriculumInfo.startsOn}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <p className="font-medium text-gray-700">Description</p>
                        <p className="ml-1 mt-1">{curriculumInfo.description}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                        <p className="font-medium text-gray-700">Access</p>
                        <p className="ml-1 mt-1">{curriculumInfo.access}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                        <p className="font-medium text-gray-700">Ends On</p>
                        <p className="ml-1 mt-1">{curriculumInfo.endsOn}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <p className="font-medium text-gray-700">Seat Time</p>
                        <p className="ml-1 mt-1">{curriculumInfo.seatTime}</p>
                    </div>
                    
                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                        <p className="font-medium text-gray-700">Number of Contents</p>
                        <p className="ml-1 mt-1">{curriculumInfo.numberOfContents}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                        <p className="font-medium text-gray-700">Assigned Learners</p>
                        <p className="ml-1 mt-1">{assigned.length}</p>
                    </div>

                </div>
            </section>

            {/* ─── FOOTER NAV ──────────────────────────────────── */}
            <div className="flex justify-start items-center gap-4 px-6 py-2 bg-gray-100 h-18 w-full mt-6" >
                <Link
                    href="/teacher/curriculum"
                    className="h-10 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Save &amp; Complete
                </Link>
                <button
                    onClick={onBack}
                    className="h-10 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                >
                    Back
                </button>
            </div >

            {/* Assign Learners Modal */}
            <AssignLearnersModal
                isOpen={showAssignModal}
                onClose={() => setShowAssignModal(false)}
                allUsers={allPossibleLearners}
                onAssign={handleAssign}
            />
        </div>
    );
}
