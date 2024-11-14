import { type ClassValue, clsx } from "clsx"
import jwt from "jsonwebtoken"
import { twMerge } from "tailwind-merge"
import { renewToken } from "./queries/auth.queries"

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

const TOKEN_RENEWAL_THRESHOLD = 2 * 60

export async function tryRenewingToken(token: string) {
  const decoded = jwt.decode(token)
  if (!decoded) {
    return
  }

  console.log(decoded)

  // Check if token is nearing expiration
  const currentTime = Math.floor(Date.now() / 1000)
  const expiresIn =
    (
      decoded as {
        exp: number
        pub: string
        email: string
      }
    ).exp - currentTime

  if (expiresIn < TOKEN_RENEWAL_THRESHOLD) {
    // Renew the token if it is expired or will expire soon
    await renewToken()
  }
}
