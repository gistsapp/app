import { Pen, Plus, Trash2, Users } from 'lucide-react'
import { ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuSeparator, ContextMenuLabel, ContextMenu, ContextMenuTrigger } from '../shadcn/context-menu'
import Shortcut from './shortcut'

interface TeamSectionProps {
  title: string
  onDeleteTeam: () => void
}

export function TeamSection({ title, onDeleteTeam }: TeamSectionProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="py-4 px-3 flex items-center justify-start rounded-md text-sm font-semibold text-slate-400 w-full">{title}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel className="font-semibold">{title}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          <span>Create gist</span>
          <ContextMenuShortcut>
            <Shortcut letter="C" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Pen className="mr-2 h-4 w-4" />
          <span>Change name</span>
          <ContextMenuShortcut>
            <Shortcut letter="U" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Invite members</span>
          <ContextMenuShortcut>
            <Shortcut letter="I" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDeleteTeam}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete team</span>
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
