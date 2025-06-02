"use client";
import React, { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faClock } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import DonutChart from "../charts/donut/DonutChart";
import PieChart from "../charts/pie/PieChart";

export const DashboardCharts = () => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }


    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 h-full">
            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex justify-between">
                    <div className="inline-flex gap-2 items-baseline">
                        <FontAwesomeIcon icon={faChartSimple} className="text-red-700" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Overall Progress
                        </h3>
                    </div>

                    <div className="relative inline-block">
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                        </button>
                        <Dropdown
                            isOpen={isOpen}
                            onClose={closeDropdown}
                            className="w-40 p-2"
                        >
                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                View More
                            </DropdownItem>
                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                Delete
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-6">
                    <DonutChart data={[
                        { name: "Started", value: 4 },
                        { name: "Completed", value: 3 },
                        { name: "Not Started", value: 3 },
                        { name: "Due", value: 1 },
                    ]}
                        colors={["#DA1A32", "#D76A76", "#E18B9C", "#F7C119"]}
                    />
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex justify-between">
                    <div className="inline-flex gap-2 items-baseline">
                        <FontAwesomeIcon icon={faClock} className="text-red-700" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Learning Time
                        </h3>
                    </div>

                    <div className="relative inline-block">
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                        </button>
                        <Dropdown
                            isOpen={isOpen}
                            onClose={closeDropdown}
                            className="w-40 p-2"
                        >
                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                View More
                            </DropdownItem>
                            <DropdownItem
                                onItemClick={closeDropdown}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                Delete
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-6">
                    <PieChart 
                        assessmentsTime={592}  // misal 120 menit
                        modulesTime={334}      // misal 300 menit
                    />
                </div>
            </div>
            {/* <!-- Metric Item End --> */}
        </div>
    );
};
