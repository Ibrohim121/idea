'use client';

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

type ProfileOverrides = {
  name?: string;
  email?: string;
};

type ProfileContextValue = {
  overrides: ProfileOverrides;
  setOverrides: (next: Partial<ProfileOverrides>) => void;
  clearOverrides: () => void;
};

const PROFILE_KEY = "profile-overrides";
const PROFILE_EVENT = "profile-overrides-change";
const ProfileContext = createContext<ProfileContextValue | null>(null);
const EMPTY_OVERRIDES: ProfileOverrides = {};
let lastRaw: string | null = null;
let lastParsed: ProfileOverrides = EMPTY_OVERRIDES;

function readProfileSnapshot(): ProfileOverrides {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    lastRaw = null;
    lastParsed = EMPTY_OVERRIDES;
    return EMPTY_OVERRIDES;
  }

  try {
    if (raw === lastRaw) return lastParsed;
    const parsed = JSON.parse(raw) as ProfileOverrides;
    lastRaw = raw;
    lastParsed = parsed && typeof parsed === "object" ? parsed : EMPTY_OVERRIDES;
    return lastParsed;
  } catch {
    lastRaw = null;
    lastParsed = EMPTY_OVERRIDES;
    return EMPTY_OVERRIDES;
  }
}

function getServerSnapshot(): ProfileOverrides {
  return EMPTY_OVERRIDES;
}

function subscribeProfile(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === PROFILE_KEY) onStoreChange();
  };
  const onCustom = () => onStoreChange();

  window.addEventListener("storage", onStorage);
  window.addEventListener(PROFILE_EVENT, onCustom as EventListener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(PROFILE_EVENT, onCustom as EventListener);
  };
}

export function ProfileOverridesProvider({ children }: { children: React.ReactNode }) {
  const overrides = useSyncExternalStore(subscribeProfile, readProfileSnapshot, getServerSnapshot);

  const value = useMemo<ProfileContextValue>(() => {
    const setOverrides = (next: Partial<ProfileOverrides>) => {
      if (typeof window === "undefined") return;
      const current = readProfileSnapshot();
      const merged = { ...current, ...next };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new Event(PROFILE_EVENT));
    };

    const clearOverrides = () => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(PROFILE_KEY);
      window.dispatchEvent(new Event(PROFILE_EVENT));
    };

    return { overrides, setOverrides, clearOverrides };
  }, [overrides]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfileOverrides() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileOverrides must be used within ProfileOverridesProvider");
  }
  return context;
}
