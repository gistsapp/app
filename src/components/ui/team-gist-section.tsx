import { Trash2 } from 'lucide-react'
import { ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuSeparator, ContextMenuLabel, ContextMenu, ContextMenuTrigger } from '../shadcn/context-menu'
import Shortcut from './shortcut'
import { Gist, Team } from '@/types'
import MenuButton from './menu-button'

interface TeamGistSectionProps {
  gist: Gist
  team: Team
  onGistClick: () => void
  onDeleteGist: () => void
}

export function TeamGistSection({ gist, team, onGistClick, onDeleteGist }: TeamGistSectionProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-start rounded-md text-sm font-semibold text-slate-400 w-full">
        <MenuButton key={gist.id} variant="menu" size="menu" onClick={onGistClick} href={'/team/' + team.id + '/gist/' + gist.id} className="w-full">
          {gist.name}
        </MenuButton>
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
