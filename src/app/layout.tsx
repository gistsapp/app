import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import BlurBackground from '@/components/ui/blur-background'
import ThemeWrapper from '@/components/theme/theme-wrapper'
import { Toaster } from '@/components/shadcn/toaster'
import { Providers } from '@/components/theme/theme-provider'

const fontSans = FontSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gists',
  description: 'Create and share code snippets.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('text-back overflow-hidden', fontSans.className)}>
        <Providers>
          <ThemeWrapper>
            <div className="z-10 flex justify-center">{children}</div>
            <BlurBackground />
            <Toaster />
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  )
}
