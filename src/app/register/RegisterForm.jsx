"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 400) {
        setError(data.error);
      }

      if (response.status === 500) {
        setError(data.error);
      }

      if (response.status === 201) {
        router.push("/login");
        toast.success("Profile Created");
      }
    } catch (error) {
      console.log(error);
      console.error("Error during sign-up:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSignUp}>
      <div className="w-full flex-1 mt-8">
        <div className="mx-auto max-w-xs">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            name="firstName"
            required
            placeholder="First Name"
          />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
          />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            type="password"
            name="password"
            required
            placeholder="Password"
          />

          {error && (
            <p className="italic text-xs text-red-500 mt-2 mb-3">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`mt-5 tracking-wide font-semibold  text-gray-100 w-full py-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
              loading ? "border border-primary" : "bg-primary"
            }`}
          >
            <svg
              className="w-6 h-6 -ml-2 dark:text-white text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy={7} r={4} />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            {loading ? (
              <Image
                src="/images/Spinner.svg"
                width={25}
                height={25}
                alt="Loading"
                className="ml-3"
                property=""
              />
            ) : (
              <span className="ml-3">Sign Up</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
