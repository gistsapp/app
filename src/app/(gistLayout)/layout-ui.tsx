import { TeamListFeature } from "@/components/feature/team-list-feature";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import MenuButton from "@/components/ui/menu-button";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import Shortcut from "@/components/ui/shortcut";
import { FileCodeIcon, LucidePencil, PlusIcon } from "lucide-react";

interface GistLayoutProps {
  username: string;
  avatar: string;
  children: React.ReactNode;
  onMyGistsClick: () => void;
  onCreateTeamClick: () => void;
}

export default function GistLayout({
  avatar,
  children,
  username,
  onMyGistsClick,
  onCreateTeamClick,
}: GistLayoutProps) {
  return (
    <div className="w-full h-screen flex flex-row p-2">
      <div className="w-min flex flex-col gap-8 flex-shrink-0 pr-2">
        <div className="flex flex-row gap-10 items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={avatar} />
              <AvatarFallback className="bg-muted-foreground">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ProfileDropdown username={username} />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="w-8 h-8 flex-shrink-0"
                  size={"icon"}
                  variant={"icon"}
                >
                  <LucidePencil className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Create a new Gist</span>
                <Shortcut letter="C" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-2">
          <MenuButton
            icon={<FileCodeIcon />}
            variant="menu"
            size="menu"
            letter="M"
            onClick={onMyGistsClick}
            href="/mygist"
            className="w-full"
          >
            My Gists
          </MenuButton>
          <MenuButton
            icon={<PlusIcon />}
            variant="menu"
            size="menu"
            letter="T"
            onClick={onCreateTeamClick}
            className="w-full"
          >
            Create team
          </MenuButton>
        </div>
        <TeamListFeature />
      </div>
      {children}
    </div>
  );
}
