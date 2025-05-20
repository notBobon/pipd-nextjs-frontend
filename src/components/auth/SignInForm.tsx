"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "userlearner" && password === "prototypetest21") {
      router.push("/"); // Ganti ke /learner
    } else if (username === "userteacher" && password === "prototypetest03") {
      router.push("/"); // Ganti ke /teacher
    } else {
      setError("User credentials not valid!");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-bold text-red-600 text-title-sm dark:text-white/90 sm:text-title-md">
          Welcome
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your account details
        </p>
          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          {/* Username with persistent floating label */}
          <div
            className="
              relative bg-gray-100 border border-transparent rounded-lg
              px-4 pt-5 pb-2 transition-colors
              focus-within:bg-white focus-within:border-black
            "
          >
            <input
              id="username"
              name="username"
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                peer block w-full bg-transparent appearance-none
                focus:outline-none text-base text-gray-800
                placeholder-transparent
              "
            />
            <label
              htmlFor="username"
              className="
                absolute left-4 top-2 
                text-xs text-gray-500 origin-[0]
                transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
                peer-focus:text-gray-700 peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold
              "
            >
              Username
            </label>
          </div>

          {/* Password with persistent floating label */}
          <div
            className="
              relative bg-gray-100 border border-transparent rounded-lg
              px-4 pt-5 pb-2 transition-colors
              focus-within:bg-white focus-within:border-black
            "
          >
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                peer block w-full bg-transparent appearance-none
                focus:outline-none text-base text-gray-800
                placeholder-transparent
              "
            />
            <label
              htmlFor="password"
              className="
                absolute left-4 top-2 
                text-xs text-gray-500 origin-[0]
                transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
                peer-focus:text-gray-700 peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold
              "
            >
              Password
            </label>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span className="font-normal text-gray-700 text-theme-sm dark:text-gray-400">
              Remember Me
            </span>
          </div>

          {/* Submit */}
          <Button size="sm" variant="primary" className="w-full">
            Sign in
          </Button>
        </form>

        {/* Forgot password */}
        <div className="mt-5 text-center">
          <Link
            href="/reset-password"
            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
