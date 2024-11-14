import Link from "next/link"
import { Badge } from "../shadcn/badge"
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenu,
  ContextMenuTrigger,
} from "../shadcn/context-menu"
import { Trash2 } from "lucide-react"
import Shortcut from "./shortcut"
import { Gist } from "@/types"
import { Codearea } from "../shadcn/codearea"
import { getLanguage } from "@/lib/language"

interface CardProps {
  gist: Gist
  href: string
  onDeleteGist: () => void
}

export default function Card({ gist, href, onDeleteGist }: CardProps) {
  const language = getLanguage(gist.name)

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={href}
          passHref
          className="relative flex items-center justify-start hover:border-primary transition-all group/card border-border border group w-full h-full overflow-hidden"
        >
          <Badge className="absolute bottom-8 left-8" variant={"title"}>
            {gist.name}
          </Badge>
          <div className={`${gist.code === "" ? "flex w-full items-center justify-center" : "absolute inset-0 -z-10"}`}>
            {gist.code !== "" ? (
              <Codearea
                className="w-full h-full rounded-none opacity-50 group-hover/card:opacity-100 transition-all duration-200 border-none p-4"
                value={gist.code}
                language={language}
              />
            ) : (
              <div className="text-[10px] opacity-50 group-hover/card:opacity-100 transition-all duration-200 p-4 text-gray-500">
                Gist empty
              </div>
            )}
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel className="font-semibold">{gist.name}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDeleteGist}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete gist</span>
          <ContextMenuShortcut className="flex flex-row gap-2 justify-center items-center">
            <Shortcut letter="R" />
            <span>+</span>
            <Shortcut letter="M" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
