"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";

const DropzoneComponent: React.FC = () => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
    // Handle file uploads here
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
      "application/pdf": [],
      "xlsx": [],
    },
  });
  return (
    <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-red-500">
      <div
        {...getRootProps()}
        className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${isDragActive
            ? "border-red-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
          }
      `}
        id="demo-upload"
      >
        {/* Hidden Input */}
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0!">
          {/* Icon Container */}
          <div className="mb-1 flex justify-center">
            <FontAwesomeIcon icon={faCloudUpload} size="3x"/>
          </div>

          {/* Text Content */}
          <h4 className="mb-1 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            {isDragActive ? "Drop Files Here" : "Drag & Drop"}
          </h4>
          <div>
            <span className="text-sm font-normal no-underline text-gray-400">or </span><span className="underline text-brand-500">Browse File</span>
          </div>

          <span className="mt-4 text-center block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
            Accepts JPG, PNG, GIF
          </span>


        </div>
      </div>
    </div>
  );
};

export default DropzoneComponent;
