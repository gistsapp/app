import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn, getBackendURL } from '@/lib/utils'
import BlurBackground from '@/components/ui/blur-background'
import ThemeWrapper from '@/components/theme/theme-wrapper'
import { Toaster } from '@/components/shadcn/toaster'
import { Providers } from '@/components/theme/theme-provider'
import QueryProvider from '@/components/api/api-provider'

const fontSans = FontSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create and share secure code snippets - Gists',
  description: 'Gists lets developers create, share, and collaborate on secure code snippets.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <link rel="icon" href="/favicon.png" sizes="300" />
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="0e9bcd71-c239-4666-9b8e-a7c9e99ae235"></script>
      </head>
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
