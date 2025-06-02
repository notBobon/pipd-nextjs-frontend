// components/ecommerce/DashboardStats.tsx
"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faLock,
  faLayerGroup,
  faComments,
  faCalendarCheck,
  faHeadset,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";

/**
 * Tipe untuk setiap kartu statistik
 */
interface StatCard {
  title: string;
  count: number | string;
  icon: any; // Specify a more specific type
  bgColor: string; // Tailwind class untuk background
}

/**
 * Komponen DashboardStats
 * Menampilkan grid kartu-kartu statistik (pending, locked, curriculum requests, dst.)
 */
export default function DashboardStats() {
  /**
   * Contoh data; silakan ganti dengan data dinamis jika diperlukan.
   */
  const stats: StatCard[] = [
    {
      title: "Pending Registration",
      count: 0,
      icon: faUserPlus,
      bgColor: "bg-green-600"
    },
    {
      title: "Locked Accounts",
      count: 2,
      icon: faLock,
      bgColor: "bg-red-600"
    },
    {
      title: "Curriculum Requests",
      count: 237,
      icon: faLayerGroup,
      bgColor: "bg-blue-800"
    },
    {
      title: "Line Manager Nominations",
      count: 31,
      icon: faComments,
      bgColor: "bg-indigo-800"
    },
    {
      title: "Certification Approval",
      count: 0,
      icon: faClipboardList,
      bgColor: "bg-gray-800"
    },
    {
      title: "Event Nomination",
      count: 0,
      icon: faCalendarCheck,
      bgColor: "bg-blue-800"
    },
    {
      title: "Helpdesk Issues",
      count: 4,
      icon: faHeadset,
      bgColor: "bg-green-700"
    },
    {
      title: "Training Requests",
      count: 10,
      icon: faClipboardList,
      bgColor: "bg-indigo-900"
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 mb-6 px-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                      flex items-center p-4 rounded-lg text-white ${stat.bgColor}`}
        >
          <div className="p-3 rounded-full bg-white/20">
            <FontAwesomeIcon icon={stat.icon} className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-semibold">{stat.count}</p>
            <p className="text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
