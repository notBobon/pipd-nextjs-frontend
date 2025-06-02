"use client";

import React, { useState } from "react";
import MultiSelect from "@/components/form/MultiSelect";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import CardGridSearchResults from "@/components/ui/cards/CardGridSearchResults";

export default function MyLearningSearchResults() {

    const optionsSort = [
        { value: "assigneddate", label: "Assigned Date" },
        { value: "duedate", label: "Due Date" },
        { value: "name", label: "Name" },
        { value: "status", label: "Status" },
    ];

    const optionsShow = [
        { value: "all", label: "All" },
        { value: "featured", label: "Featured" },
        { value: "selfassigned", label: "Self Assigned" },
        { value: "lmsassigned", label: "LM Assigned" },
        { value: "exempted", label: "Exemted" },
        { value: "withilt", label: "With ILT" },
        { value: "withvilt", label: "With VILT" },
    ];

    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
    };

    const [direction, setDirection] = useState<"asc" | "desc" | null>(null);

    const handleClick = () => {
        // toggle: null -> asc -> desc -> asc -> …
        setDirection((prev) =>
            prev === "asc" ? "desc" : prev === "desc" ? "asc" : "asc"
        );
        // di sini kamu bisa juga panggil callback untuk sorting data
        // onSort(direction === "asc" ? "desc" : "asc")
    };

    const multiOptions = [
        { value: "1", text: "Video", selected: false },
        { value: "2", text: "Book", selected: false },
        { value: "3", text: "Audio Book", selected: false },
        { value: "4", text: "Channel", selected: false },
        { value: "5", text: "Journey", selected: false },
        { value: "6", text: "Lab", selected: false },
        { value: "7", text: "Assesment", selected: false },
        { value: "8", text: "Article", selected: false },
        { value: "9", text: "Ascend", selected: false },
        { value: "10", text: "Case Study", selected: false },
    ];
    return (
        <div className="flex flex-col items-left justify-between gap-3">  
            <div className="flex flex-cols-3 gap-4 md:gap-6">
                <div className="w-[300px] border-gray-200 border-r-2 pr-4">
                    <Label>Sort By</Label>
                    <div className="flex flex-row items-center">
                        <div className="relative w-full">
                            <Select
                                options={optionsSort}
                                placeholder="Select Option"
                                defaultValue="status"
                                onChange={handleSelectChange}
                                className="bg-white dark:bg-dark-900"
                            />
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                <ChevronDownIcon />
                            </span>

                        </div>
                        <button onClick={handleClick}
                            className="inline-flex items-center space-x-4 ml-6 p-1"
                            aria-label="Toggle sort">
                            <FontAwesomeIcon
                                icon={faArrowUp}
                                // arrow atas jadi berwarna saat direction === 'asc'
                                className={`transition-colors ${direction === "asc" ? "text-red-600" : "text-gray-400"
                                    }`}
                            />
                            <FontAwesomeIcon
                                icon={faArrowDown}
                                // arrow bawah jadi berwarna saat direction === 'desc'
                                className={`transition-colors ${direction === "desc" ? "text-red-600" : "text-gray-400"
                                    }`}
                            />
                        </button>
                    </div>

                </div>
                <div className="w-[300px] border-gray-200 border-r-2 pr-8">
                    <Label>Show Curriculums</Label>
                    <div className="relative">
                        <Select
                            options={optionsShow}
                            defaultValue="all"
                            onChange={handleSelectChange}
                            className="bg-white dark:bg-dark-900"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                </div>
                <div className="w-[500px]">
                    <MultiSelect
                        label="Curriculum Type"
                        options={multiOptions}
                        defaultSelected={["1", "2"]}
                        onChange={(values) => setSelectedValues(values)}
                    />
                    <p className="sr-only">
                        Selected Values: {selectedValues.join(", ")}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                 <div className="col-span-12 xl:col-span-12">
                    <CardGridSearchResults />
                </div>
            </div>
        </div>
    );
}
