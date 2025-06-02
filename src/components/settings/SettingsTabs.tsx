"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Select from "../form/Select";
import { ChevronDownIcon, ChevronUpIcon } from "@/icons";

export default function SettingsTabs() {
    const tabs = ["Preferences", "Language", "Time Zone"] as const;
    const [active, setActive] = useState<typeof tabs[number]>("Preferences");
    const options = [
        { value: "english", label: "English (en)" },
        { value: "indonesia", label: "Indonesia (id)" },
        { value: "spanish", label: "Spanish" },
    ];

    const digestOptions = [
        { value: "none", label: "No digest (single email per forum post)" },
        { value: "daily", label: "Complete daily digest" },
        { value: "weekly", label: "Complete weekly digest" },
    ];
    const autoSubscribeOptions = [
        { value: "yes", label: "Yes: when I post, subscribe me to that discussion" },
        { value: "no", label: "No: subscribe only if I ask" },
    ];
    const booleanOptions = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
    ];
    const trackingOptions = [
        { value: "none", label: "No: don't keep track of posts I have seen" },
        { value: "yes", label: "Yes: keep track of read posts" },
    ];
    const notifyOptions = [
        { value: "mark_read", label: "Mark the post as read" },
        { value: "keep_unread", label: "Leave post unread" },
    ];


    // Forum tracking collapse
    const [trackingOpen, setTrackingOpen] = useState(false);

    // --- Time Zone data & state ---
    // Contoh beberapa zona, bisa ditambah
    const timezoneOptions = [
        { value: "UTC", label: "UTC" },
        { value: "Asia/Jakarta", label: "Asia/Jakarta" },
        { value: "Europe/London", label: "Europe/London" },
        { value: "America/New_York", label: "America/New_York" },
    ];
    const defaultTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [timezone, setTimezone] = useState(defaultTZ);
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString("en-US", {
            timeZone: defaultTZ,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    );

    // Update jam setiap detik
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString("en-US", {
                    timeZone: timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        }, 1000);
        return () => clearInterval(timer);
    }, [timezone]);

    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
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
                {/* Preferences Panel */}
                {active === "Preferences" && (
                    <div className="border rounded-2xl border-gray-200 bg-white p-6 space-y-6">
                        {/* Forum preferences */}
                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">
                                Forum preferences
                            </h4>
                            <div className="flex flex-col w-1/2 gap-4 lg:grid-cols-3">
                                <div>
                                    <Label htmlFor="digest">Email digest type</Label>
                                    <div className="relative">
                                        <Select
                                            options={digestOptions}
                                            placeholder="Select Option"
                                            onChange={handleSelectChange}
                                            className="dark:bg-dark-900"
                                        />
                                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                            <ChevronDownIcon />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="autoSubscribe">Forum auto-subscribe</Label>
                                    <div className="relative">
                                        <Select
                                            options={autoSubscribeOptions}
                                            placeholder="Select Option"
                                            onChange={handleSelectChange}
                                            className="dark:bg-dark-900"
                                        />
                                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                            <ChevronDownIcon />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="nestedView">
                                        Use experimental nested discussion view
                                    </Label>
                                    <div className="relative">
                                        <Select
                                            options={booleanOptions}
                                            placeholder="Select Option"
                                            onChange={handleSelectChange}
                                            className="dark:bg-dark-900"
                                        />
                                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                            <ChevronDownIcon />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Forum tracking (collapsible) */}
                        <div className="border-t pt-4">
                            <button
                                className="flex items-center justify-between w-full"
                                onClick={() => setTrackingOpen((o) => !o)}
                            >
                                <h4 className="text-lg font-semibold text-gray-800">
                                    Forum tracking
                                </h4>
                                {trackingOpen ? (
                                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {trackingOpen && (
                                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <Label htmlFor="tracking">Forum tracking</Label>
                                        <div className="relative">
                                            <Select
                                                options={trackingOptions}
                                                placeholder="Select Option"
                                                onChange={handleSelectChange}
                                                className="dark:bg-dark-900"
                                            />
                                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                                <ChevronDownIcon />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="notifyAction">
                                            When sending forum post notifications
                                        </Label>
                                        <div className="relative">
                                            <Select
                                                options={notifyOptions}
                                                placeholder="Select Option"
                                                onChange={handleSelectChange}
                                                className="dark:bg-dark-900"
                                            />
                                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                                <ChevronDownIcon />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-4">
                            
                            <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                                Save changes
                            </Button>
                            <Button variant="outline" size="sm">
                                Cancel
                            </Button>
                            
                        </div>
                    </div>
                )}

                {/* Language Panel */}
                {active === "Language" && (
                    <div className="border rounded-2xl border-gray-200 bg-white p-6">
                        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                            Preferred Language
                        </h4>
                        <form className="space-y-4">
                            <div className="w-1/4">
                                <Label>Choose Language</Label>
                                <div className="relative">
                                    <Select
                                        options={options}
                                        placeholder="Select Language"
                                        onChange={handleSelectChange}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        <ChevronDownIcon />
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                                    Set Language
                                </Button>
                                <Button variant="outline" size="sm">
                                    Cancel
                                </Button>

                            </div>
                        </form>
                    </div>
                )}

                {/* Time Zone Panel */}
                {active === "Time Zone" && (
                    <div className="border rounded-2xl border-gray-200 bg-white p-6">
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                            
                            Time Zone
                        </h4>

                        <div className="grid grid-cols-1 space-x-4 gap-6 lg:grid-cols-2">
                            {/* Select Zona */}
                            <div>
                                <Label htmlFor="timezone-select">Select Time Zone</Label>
                                <div className="relative">
                                    <Select

                                        options={timezoneOptions}

                                        onChange={setTimezone}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        <ChevronDownIcon />
                                    </span>
                                </div>
                            </div>

                            {/* Display waktu */}
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faCircleInfo} className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Current time</p>
                                    <p className="text-base font-medium text-gray-800">{currentTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                                Set Time Zone
                            </Button>
                            <Button variant="outline" size="sm">
                                Cancel
                            </Button>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
