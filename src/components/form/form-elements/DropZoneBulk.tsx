// components/DropzoneComponent.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUpload,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

type AcceptedFile = {
  name: string;
  size: number;
  // you can include more file props as needed
};

export default function DropzoneComponent() {
  // 1) The file the user selected (only allow one .xlsx at a time)
  const [selectedFile, setSelectedFile] = useState<AcceptedFile | null>(null);

  // 2) Whether we have “uploaded successfully”
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // 3) Handler when user drops or browses
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    // Only take the first file
    const file = acceptedFiles[0];
    // Optional: ensure it's .xlsx
    if (!file.name.match(/\.xlsx$/i)) {
      alert("Please select an .xlsx file.");
      return;
    }
    setSelectedFile({ name: file.name, size: file.size });
    setUploadSuccess(false);
  }, []);

  // 4) Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  });

  // 5) Cancel the current selection (before upload)
  const handleCancel = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
  };

  // 6) Simulate a “file upload” and then show success panel
  const handleSubmit = () => {
    // Example: you can perform an actual API call here (e.g. FormData)
    // For now, simulate a short delay:
    setTimeout(() => {
      setUploadSuccess(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/*
        If no file is selected OR user clicked “Cancel,” show the drop zone.
        If a file *is* selected but not yet submitted, show the preview card.
        If “uploadSuccess” is true, show the success panel.
      */}
      {!selectedFile && !uploadSuccess && (
        <div
          {...getRootProps()}
          className={`
            transition border-2 border-dashed cursor-pointer rounded-xl
            p-8 text-center
            ${isDragActive
              ? "border-red-500 bg-gray-100 dark:bg-gray-800"
              : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-3">
            <FontAwesomeIcon icon={faCloudUpload} size="3x" className="text-gray-700 dark:text-gray-300" />
            <h4 className="font-semibold text-gray-800 dark:text-white">
              {isDragActive ? "Drop Files Here" : "Drag & Drop"}
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              or <span className="underline text-red-600">Browse File</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Accepts XLSX
            </span>
          </div>
        </div>
      )}

      {selectedFile && !uploadSuccess && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Display a big cloud icon */}
            <FontAwesomeIcon icon={faCloudUpload} size="3x" className="text-gray-800 dark:text-gray-100" />

            {/* Show the selected file name */}
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {selectedFile.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Submit to upload users data
            </p>

            {/* Buttons: Submit / Cancel */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSubmit}
                className="
                  px-6 py-2 bg-red-600 text-white rounded-md text-sm font-medium
                  hover:bg-red-700
                "
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="
                  px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium
                  hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 p-8">
          <div className="flex flex-col items-center space-y-4">
            <FontAwesomeIcon icon={faCircleCheck} size="3x" className="text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              File Uploaded
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
              We have successfully uploaded and processed your file!
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-50">
              {selectedFile?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
