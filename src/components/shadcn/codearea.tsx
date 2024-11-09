import React from "react"
import CodeEditor from "@uiw/react-textarea-code-editor"
import { cn } from "@/lib/utils"

export interface CodeareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  language?: string
}

const Codearea = ({ className, language, ...props }: CodeareaProps) => {
  return (
    <CodeEditor
      value={props.value}
      language={language}
      onChange={props.onChange}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      placeholder={props.placeholder}
      style={{
        backgroundColor: "#0C0D0E",
        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
      }}
    />
  )
}

Codearea.displayName = "Codearea"

export { Codearea }
