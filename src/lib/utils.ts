import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBackendURL() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://api-gists.courtcircuits.xyz"
  );
}
