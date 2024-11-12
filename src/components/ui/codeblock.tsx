import { Badge } from "../shadcn/badge"
import { Codearea } from "../shadcn/codearea"
import { Input } from "../shadcn/input"
import { Gist } from "@/types"
import { getLanguage } from "@/lib/language"
import { ReactNode } from "react"

interface CodeBlockProps {
  gist: Gist
  onGistNameChange: (name: string) => void
  onGistCodeChange: (code: string) => void
  children?: ReactNode
}

interface CodeBlockLandingProps {
  children: ReactNode
}

export function CodeBlockLanding({ children }: CodeBlockLandingProps) {
  return <>{children}</>
}

export default function CodeBlock({ gist, onGistNameChange, onGistCodeChange, children }: CodeBlockProps) {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-6 group">
        <Badge variant="section" className="w-fit">
          File name
        </Badge>
        <Input
          placeholder="Enter your gist name here"
          value={gist.name}
          onChange={(e) => onGistNameChange(e.target.value)}
          className="rounded-none"
        />
      </div>
      <div className="h-full flex flex-col gap-6 group">
        <Badge variant="section" className="w-min">
          Code
        </Badge>
        <div className="flex flex-row h-full relative">
          <Codearea
            placeholder="Try it, and write your code here"
            value={gist.code}
            onChange={(e) => onGistCodeChange(e.target.value)}
            className="rounded-none h-full"
            language={getLanguage(gist.name)}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
