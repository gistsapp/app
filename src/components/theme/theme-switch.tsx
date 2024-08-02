'use client'

import { LucideMoon, LucideSun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => setMounted(true), [])

  if (!mounted) return <>...</>

  if (currentTheme === 'dark') {
    return (
      <LucideSun
        className="h-6 w-6"
        onClick={() => {
          setTheme('light')
          console.log('light')
        }}
      />
    )
  }

  if (currentTheme === 'light') {
    return (
      <LucideMoon
        className="h-6 w-6 text-gray-900"
        onClick={() => {
          setTheme('dark')
          console.log('dark')
        }}
      />
    )
  }
}
