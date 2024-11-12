import { Pen, Plus, Trash2, Users } from "lucide-react"
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenu,
  ContextMenuTrigger,
} from "../shadcn/context-menu"
import Shortcut from "./shortcut"
import { Modal } from "./modal"
import { Input } from "../shadcn/input"
import MenuButton from "./menu-button"
import { useState } from "react"

interface OrgSectionProps {
  title: string
  onDeleteTeam: () => void
  onUpdateTeamClick: (name: string) => void
}

export function OrgSection({ title, onDeleteTeam, onUpdateTeamClick }: OrgSectionProps) {
  const [orgName, setOrgName] = useState("")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="py-4 px-3 flex items-center justify-start rounded-md text-sm font-semibold text-slate-400 w-full">
        {title}
      </ContextMenuTrigger>
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
          <Modal
            trigger={<span>Update name</span>}
            title="Create Team"
            content={
              <div className="flex flex-col gap-3">
                <Input
                  className="border-0 bg-background p-0 h-min font-bold"
                  placeholder="Team name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
            }
            footer={
              <MenuButton variant="default" size="sm" onClick={() => onUpdateTeamClick(orgName)} className="">
                Create
              </MenuButton>
            }
          ></Modal>
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
