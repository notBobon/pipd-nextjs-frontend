import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          <div className="lg:w-3/5 w-full h-full bg-[#F7F7F7] dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center mt-16">
                  <Image
                    width={231}
                    height={48}
                    className="block mb-4"
                    src="./images/logo/signin-logo.svg"
                    alt="Logo"
                  />
                <p className="text-center dark:text-white/60 max-w-md">
                  Home Credit Indonesia's digital platform for employee learning, information, and knowledge access
                </p>
                <div className="">
                  <Image
                    width={700}
                    height={280}
                    src="./images/logo/illustration-hc.svg"
                    alt="Logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}
