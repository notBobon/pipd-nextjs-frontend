// components/Card.tsx
"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";

export interface CardSearchResultsProps {
    id: string;
    /** URL gambar */
    imageSrc: string;
    /** Alt text untuk gambar */
    imageAlt?: string;
    /** Judul kartu */
    title: string;
    /** Deskripsi singkat */
    description: string;
    rating: number;
    /** Teks tombol utama (opsional) */
    buttonText?: string;
    /** URL tombol utama (opsional) */
    buttonHref?: string;
    /** Jika ingin menampilkan link kecil alih-alih tombol */
    linkText?: string;
    /** URL link kecil (opsional) */
    linkHref?: string;
    onClick: (id: string) => void;
}


export default function CardSearchResults({
    id,
    imageSrc,
    imageAlt = "",
    title,
    description,
    rating,
    onClick,
}: CardSearchResultsProps) {
    return (
        
            <div onClick={() => onClick(id)}  className={`flex flex-col w-[380px] h-[450px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
            {/* Image */}
            <div className="relative w-full h-56">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        {title}
                    </h3>
                    <div className="inline-flex gap-2 items-center">
                        <FontAwesomeIcon icon={faCircleInfo} className="text-red-700" />
                        <p className="text-sm text-gray-800 dark:text-white/90">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row mt-2 justify-between">
                    <div className="flex flex-row">
                        <Rating rating={rating} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white/90">
                        Last Accessed
                    </p>
                </div>
            </div>
        </div>
        
        
    );
}
