"use client";
import { useEffect } from "react";

function useScrollBehavior(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.scrollBehavior = "smooth";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.scrollBehavior = "smooth";
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}

export default useScrollBehavior;
