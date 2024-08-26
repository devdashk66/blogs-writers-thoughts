"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-primary text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transform  transition-all duration-300 ml-5"
    >
      Logout
    </button>
  );
};

export default Logout;
