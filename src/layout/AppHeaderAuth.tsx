"use client";

import Image from "next/image";
import Link from "next/link";

const AppHeader: React.FC = () => {
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50
        h-16 flex items-center
        bg-white border-b border-gray-200 
        dark:bg-gray-900 dark:border-gray-800
        transition-all
        px-4 sm:px-6 lg:px-8
        ">
      <div className="flex items-center justify-between w-full p-16">
          <Link href="" className="flex-shrink-0">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="./images/logo/hc-logo.svg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>
        </div>
    </header>
  );
};

export default AppHeader;
