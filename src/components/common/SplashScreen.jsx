"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SplashScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="bg-white dark:bg-[#181818] flex items-center justify-center w-screen h-screen overflow-hidden">
          <Image
            src="/images/Spinner.svg"
            width={100}
            height={100}
            className="animate-bounce"
            alt="Blog Splash Logo"
            priority
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default SplashScreen;
