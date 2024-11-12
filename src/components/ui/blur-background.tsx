"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export default function BlurBackground() {
  const { theme } = useTheme()

  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none">
      <div
        className={cn(
          "h-[600px] w-[600px] bg-primary opacity-30 rounded-full",
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10",
          theme === "light" ? "blur-[100px]" : "blur-[300px]"
        )}
      />
    </div>
  )
}
