"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setContextUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (session?.user) {
        const response = await fetch("/api/me");
        const data = await response.json();
        setContextUser(data);
      }
    }
    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setContextUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
