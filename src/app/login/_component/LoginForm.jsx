"use client";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("Invalide email or password");
  return (
    <form>
      <div className="mx-auto max-w-xs">
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Email"
        />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Password"
        />
        {error && (
          <span className="text-xs italic text-red-500 mt-3 block">
            {error}
          </span>
        )}

        <button className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy={7} r={4} />
          </svg>
          <span className="ml-3">Login</span>
        </button>
        <p className="mt-6 text-xs text-gray-600 text-center">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="border-b border-gray-400 dark:text-gray-400 text-gray-800 border-dotted hover:border-b-primary hover:text-primary duration-200"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
