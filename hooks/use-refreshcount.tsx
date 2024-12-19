import { useEffect, useState } from "react";

const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

const useRefreshCount = () => {
  useEffect(() => {
    const localStorageKey = "refreshCount";
    const localRefreshId = "refreshId";
    const count = localStorage.getItem(localStorageKey);

    const refreshCount = count ? parseInt(count, 10) : 0;
    const updatedCount = refreshCount + 1;

    localStorage.setItem(localStorageKey, updatedCount.toString());
    if (updatedCount % 4 === 0) {
      const id = generateUniqueId();
      localStorage.setItem(localStorageKey, "0");
      localStorage.setItem(localRefreshId, id.toString());
    } else {
      return;
    }
  }, []);
};

export default useRefreshCount;
