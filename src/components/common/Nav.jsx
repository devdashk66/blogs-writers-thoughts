"use client";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import ToggleDarkMode from "./ToggleDarkMode";

export default function Navbar() {
  const { user } = useUser();

  return (
    // Navbar container with styles for light and dark modes
    <nav className="bg-white dark:bg-dark text-gray-900 p-4 shadow-md">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
        {/* Logo section with link to the home page */}
        <div className="text-2xl font-extrabold hover:animate-pulse text-primary mb-4 md:mb-0">
          <Link href="/">
            {/* Light mode logo */}
            <Image
              className="dark:hidden w-40 h-12 object-cover"
              src="/images/logo-black.png"
              width={300}
              height={100}
              alt="Logo"
            />
            {/* Dark mode logo */}
            <Image
              className="dark:block hidden w-40 h-12 object-cover"
              src="/images/logo-white.png"
              width={300}
              height={100}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Container for search, toggle dark mode, and user profile/login button */}
        <div className="flex flex-row gap-1 md:gap-3 justify-center items-center w-full md:w-auto">
          <Search />

          <ToggleDarkMode />

          {/* Conditional rendering based on user authentication status */}
          {user ? (
            <Link
              href="/profile"
              className="border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center shadow-md text-2xl text-white overflow-hidden"
            >
              {/* Display user's profile picture or default avatar */}
              <Image
                src={user?.profileUrl ?? "/images/default-avater.jpg"}
                width={50}
                height={50}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="tracking-wide font-semibold bg-primary text-gray-100 px-6 py-3 rounded-lg hover:bg-primary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
