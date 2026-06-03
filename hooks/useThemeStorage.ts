"use client";

import { useCallback, useEffect, useState } from "react";
import { safeLocalStorage } from "@/utils/storage";

export function useThemeStorage() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    try {
      return safeLocalStorage.get("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const saved = safeLocalStorage.get("theme");
    if (saved === "dark") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    } else {
      setIsDarkTheme(false);
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("dark-theme");
        safeLocalStorage.set("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        safeLocalStorage.set("theme", "light");
      }
      return next;
    });
  }, []);

  return { isDarkTheme, toggleTheme } as const;
}
