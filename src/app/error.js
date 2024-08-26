"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <section className="h-screen overflow-x-hidden overflow-y-hidden bg-gray-100 dark:bg-[#181818]">
      <main className="h-screen flex flex-col gap-5 justify-center items-center bg-white dark:bg-dark m-6">
        <h2 className="font-extrabold text-6xl text-gray-600 dark:text-gray-100">
          <span className="">Error</span>
        </h2>
        <p className="text-xl md:text-2xl dark:text-gray-300">
          Opps, Something went wrong
        </p>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={() => reset()}
            className="px-6 py-2 text-lg font-semibold rounded bg-primary text-gray-50 hover:text-gray-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2 text-lg font-semibold rounded bg-primary text-gray-50 hover:text-gray-200"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </section>
  );
}
