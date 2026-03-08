const AVATAR_COLORS = [
  "#0f172a",
  "#1e293b",
  "#1f2937",
  "#111827",
  "#0b3a4a",
  "#2a1b3d",
  "#3b1f2b",
  "#2d3748",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function toInitials(name?: string, email?: string) {
  if (name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
    if (initials) return initials;
  }

  if (email) {
    const base = email.split("@")[0]?.trim() ?? "U";
    return base.slice(0, 2).toUpperCase();
  }

  return "U";
}

function base64Encode(value: string) {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
  return value;
}

export function buildAvatarDataUrl(name?: string, email?: string) {
  const initials = toInitials(name, email);
  const key = `${name ?? ""}-${email ?? ""}`.trim() || "user";
  const color = AVATAR_COLORS[hashString(key) % AVATAR_COLORS.length];
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">',
    `<rect width="128" height="128" rx="24" fill="${color}"/>`,
    '<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" ',
    'font-family="Arial, Helvetica, sans-serif" font-size="48" fill="#ffffff">',
    `${initials}`,
    "</text>",
    "</svg>",
  ].join("");

  return `data:image/svg+xml;base64,${base64Encode(svg)}`;
}
