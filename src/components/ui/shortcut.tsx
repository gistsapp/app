import { cn } from "@/lib/utils"

interface ShortcutProps {
  letter: string
  className?: string
}

export default function Shortcut({ letter, className }: ShortcutProps) {
  return (
    <div
      className={cn(
        "text-[8px] text-foreground border border-slate-500 bg-slate-600 h-[14px] p-1 flex justify-center items-center rounded group-hover:bg-slate-200 group-hover:border-white group-hover:text-background",
        className
      )}
    >
      {letter}
    </div>
  )
}
