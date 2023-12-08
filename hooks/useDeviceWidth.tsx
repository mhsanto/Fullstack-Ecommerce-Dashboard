"use client";
import { useState, useEffect } from "react";

const useDeviceWidth = () => {
  const isClient = typeof window === "object"; // Check if window object is available
  const [deviceWidth, setDeviceWidth] = useState(
    isClient ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    if (isClient) {
      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]);

  return deviceWidth;
};

export default useDeviceWidth;
