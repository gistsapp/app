import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

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
      <body className={cn('bg-dark-primary text-white overflow-hidden', fontSans.className)}>
        <div className="z-10 flex justify-center">{children}</div>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[600px] w-[600px] bg-primary opacity-30 rounded-full blur-[300px]"></div>
        </div>
      </body>
    </html>
  )
}
