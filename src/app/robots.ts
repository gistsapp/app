import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://gists.app"
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login"],
        disallow: ["/mygist/", "/org/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
