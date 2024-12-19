"use client";

import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);

      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  const isMobileView = width < 576;
  const isTabletView = width >= 576 && width < 768;
  const isSmallDesktopView = width >= 768 && width < 1024;
  const isDesktopView = width >= 1024 && width < 1200;
  const isLargeDesktopView = width >= 1200;

  return {
    width,
    isMobileView,
    isTabletView,
    isSmallDesktopView,
    isDesktopView,
    isLargeDesktopView,
  };
};

export default useScreenWidth;
