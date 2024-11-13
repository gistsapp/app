import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackendURL() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.gists.app"
}

export function getRawGistURL(id: string) {
  if (process.env.NODE_ENV === "production") {
    const raw_url = getBackendURL().replace("api", "raw") + "/" + id
    return raw_url
  }
  return getBackendURL() + "/gists/raw/" + id
}
