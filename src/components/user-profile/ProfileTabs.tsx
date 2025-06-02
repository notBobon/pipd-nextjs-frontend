// components/profile/ProfileTabs.tsx
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartSimple,
    faBullseye,
    faCircleInfo,

} from "@fortawesome/free-solid-svg-icons";

import {
    faClipboard,
    faNoteSticky
} from "@fortawesome/free-regular-svg-icons";

import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Link from "next/link";

export default function ProfileTabs() {
    const tabs = ["Notifications", "Diagnostics", "Change Password"] as const;
    const [active, setActive] = useState<typeof tabs[number]>("Notifications");

    // sample data for diagnostics
    const progressionData = {
        currStarted: 4,
        currCompleted: 3,
        currNotStarted: 0,
        currDue: 8,
        cpdAchieved: 0,
        cpdNotAchieved: 750,
    };

    return (
        <div className="w-full">
            {/* Tab nav */}
            <nav className="flex space-x-8 border-b">
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
            <div className="mt-6">
                {active === "Notifications" && (
                    <div className="flex flex-col gap-6 border rounded-2xl border-gray-200 bg-white p-6 h-full">

                        <div className="space-y-4 py-4">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center">
                                    <div className="inline-flex gap-3 items-center align-middle h-30">
                                        <FontAwesomeIcon icon={faCircleInfo} className="text-theme-md" />
                                        <Link href="/" className="font-semibold text-gray-800 text-theme-md dark:text-white/90 hover:text-red-600 hover:underline">
                                            There are no updates to display here
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {active === "Diagnostics" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border rounded-2xl border-gray-200 bg-white p-6 h-full">
                        {/* Progression Card */}
                        <div className="rounded-2xl  dark:border-gray-800 dark:bg-gray-900">
                            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">

                                Progression
                            </h4>
                            <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-5 h-5 flex items-center justify-center rounded-lg">
                                        <FontAwesomeIcon icon={faChartSimple} size="lg" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                            Curriculums
                                        </p>
                                        <p className="ml-2">
                                            {progressionData.currStarted} Started ·{" "}
                                            {progressionData.currCompleted} Completed ·{" "}
                                            {progressionData.currNotStarted} Not Started ·{" "}
                                            {progressionData.currDue} Due
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-5 h-5 flex items-center justify-center rounded-lg">
                                        <FontAwesomeIcon icon={faBullseye} size="lg" className="text-gray-500" />
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                            CPD Points
                                        </p>
                                        <p className="ml-2 text-gray-500 dark:text-gray-400">
                                            {progressionData.cpdAchieved} Achieved ·{" "}
                                            {progressionData.cpdNotAchieved} Not Achieved
                                        </p>
                                    </div>



                                </div>
                            </div>
                        </div>

                        {/* Learning Time Card */}
                        <div className="rounded-2xl  bg-white dark:border-gray-800 dark:bg-gray-900">
                            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
                                Learning Time
                            </h4>
                            <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-5 h-5 flex items-center justify-center rounded-lg">
                                        <FontAwesomeIcon icon={faClipboard} size="lg" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                            Assesments
                                        </p>
                                        <p className="ml-2">
                                            27h 23m
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-5 h-5 flex items-center justify-center rounded-lg">
                                        <FontAwesomeIcon icon={faNoteSticky} size="lg" className="text-gray-500" />
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                            Modules
                                        </p>
                                        <p className="ml-2 text-gray-500 dark:text-gray-400">
                                            27h 23m
                                        </p>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {active === "Change Password" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border rounded-2xl border-gray-200 bg-white p-6 h-full">
                        {/* Change Form */}
                        <div className="rounded-2xl bg-white dark:border-gray-800 dark:bg-gray-900">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                                Change Your Password
                            </h4>
                            <form className="space-y-4">
                                <div>
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div>
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button size="sm" className="mt-2">
                                    Update Password
                                </Button>
                            </form>
                        </div>
                        {/* Strength Guidelines */}
                        <div className="rounded-2xl bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="inline-flex gap-2 items-baseline">
                                <FontAwesomeIcon icon={faCircleInfo} className="text-red-700" />
                                <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                                    Password Strength
                                </h4>
                            </div>

                            <ul className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li>Use at least one upper and lowercase letter.</li>
                                <li>Choose a strong password and don&apos;t reuse it elsewhere.</li>
                                <li>Include numbers and symbols for added security.</li>
                                <li>Avoid personal information like your birthday or phone.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
