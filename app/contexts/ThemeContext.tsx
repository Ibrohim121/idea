'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_STORAGE_KEY = "theme";
const THEME_EVENT = "app-theme-change";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function readThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function subscribeTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) onStoreChange();
  };
  const onThemeEvent = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onThemeEvent);
  window.addEventListener(THEME_EVENT, onThemeEvent as EventListener);

  return () => {
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onThemeEvent);
    window.removeEventListener(THEME_EVENT, onThemeEvent as EventListener);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeState = useSyncExternalStore(
    subscribeTheme,
    readThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    applyTheme(themeState);
  }, [themeState]);

  const value = useMemo<ThemeContextValue>(() => {
    const setTheme = (theme: ThemeMode) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.dispatchEvent(new Event(THEME_EVENT));
    };

    const toggleTheme = () => {
      const nextTheme: ThemeMode = themeState === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    };

    return {
      theme: themeState,
      setTheme,
      toggleTheme,
    };
  }, [themeState]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
