import Link from "next/link";
import React from "react";

interface BreadcrumbTeacherProps {
  pageTitle: string;
  pageSubTitle: string;
}

const PageBreadcrumbTeacher: React.FC<BreadcrumbTeacherProps> = ({ pageTitle, pageSubTitle }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-white dark:text-gray-400"
              href="/"
            >
              {pageTitle}
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-white dark:text-white/90 underline">
            {pageSubTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumbTeacher;
