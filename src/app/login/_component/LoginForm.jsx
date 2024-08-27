"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError("Invalid email or password");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mx-auto max-w-xs">
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {error && (
          <span className="text-xs italic text-red-500 mt-3 block">
            {error}
          </span>
        )}

        <button
          disabled={loading}
          type="submit"
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
            <span className="ml-3">Login</span>
          )}
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
