import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import BlurBackground from "@/components/ui/blur-background"
import ThemeWrapper from "@/components/theme/theme-wrapper"
import { Toaster } from "@/components/shadcn/toaster"
import { Providers } from "@/components/theme/theme-provider"
import QueryProvider from "@/components/api/api-provider"
import Script from "next/script"
import { Metadata } from "next"

const fontSans = FontSans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create and share secure code snippets - Gists",
  description: "Gists lets developers create, share, and collaborate on secure code snippets.",
  metadataBase: new URL("https://gists.app"),
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "gists",
    "app",
    "code snippets",
    "code sharing",
    "developer tools",
    "programming",
    "collaboration",
    "open source",
    "project management",
    "code editor",
    "gist platform",
    "coding platform",
    "software development",
    "team collaboration",
    "version control",
    "code storage",
  ],
  openGraph: {
    title: "Create and share secure code snippets - Gists",
    description: "Gists lets developers create, share, and collaborate on secure code snippets.",
    type: "website",
    url: "https://gists.app",
    siteName: "Gists",
    images: [
      {
        url: "https://gists.app/og-card.png",
        width: 1200,
        height: 630,
        alt: "Preview image for Gists.app",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="0e9bcd71-c239-4666-9b8e-a7c9e99ae235"
        data-domains="gists.app"
      />
      <body className={cn(fontSans.className)}>
        <QueryProvider>
          <Providers>
            <ThemeWrapper>
              <div className="z-10 flex justify-center">{children}</div>
              <BlurBackground />
              <Toaster />
            </ThemeWrapper>
          </Providers>
        </QueryProvider>
      </body>
    </html>
  )
}
