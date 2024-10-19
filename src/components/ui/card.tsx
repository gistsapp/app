import Link from 'next/link'
import { Badge } from '../shadcn/badge'
import { ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuSeparator, ContextMenuLabel, ContextMenu, ContextMenuTrigger } from '../shadcn/context-menu'
import { Trash2 } from 'lucide-react'
import Shortcut from './shortcut'
import { Gist } from '@/types'

interface CardProps {
  gist: Gist
  href: string
  onDeleteGist: () => void
}

export default function Card({ gist, href, onDeleteGist }: CardProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-start rounded-md text-sm font-semibold text-slate-400 w-full">
        <Link href={href} passHref className="relative hover:border-primary border-border border group w-full h-full">
          <Badge className="absolute bottom-8 left-8" variant={'title'}>
            {gist.description}
          </Badge>
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
