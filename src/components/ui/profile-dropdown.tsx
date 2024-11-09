import { ChevronDown, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu"
import { Button } from "../shadcn/button"
import Shortcut from "./shortcut"

interface ProfileDropdownProps {
  username: string
  onLogout: () => void
}

export function ProfileDropdown({ username, onLogout }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="font-medium truncate max-w-[200px]">
          <span className="truncate">{username}</span>
          <ChevronDown className="w-3 h-3 ml-2 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>
            <Shortcut letter="P" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Shortcut letter="Ctrl" />
              <span>+</span>
              <Shortcut letter="S" />
            </div>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
