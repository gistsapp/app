import { TeamListFeature } from '@/components/feature/team-list-feature'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import MenuButton from '@/components/ui/menu-button'
import { Modal } from '@/components/ui/modal'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import Shortcut from '@/components/ui/shortcut'
import { FileCodeIcon, LucidePencil, Menu, PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface GistLayoutProps {
  username: string
  avatar: string
  children: React.ReactNode
  onMyGistsClick: () => void
  onCreateTeamClick: (name: string) => void
  onCreateGistClick: (name: string, content: string) => void
  onLogoutClick: () => void
}

export default function GistLayout({ avatar, children, username, onMyGistsClick, onCreateTeamClick, onCreateGistClick, onLogoutClick }: GistLayoutProps) {
  const [gistName, setGistName] = useState('')
  const [gistContent, setGistContent] = useState('')
  const [teamName, setTeamName] = useState('')

  const handleCreateGistClick = () => {
    onCreateGistClick(gistName, gistContent)
    setGistName('')
    setGistContent('')
  }

  return (
    <div className="w-full h-screen flex flex-row p-2">
      <div className="w-min flex flex-col gap-8 flex-shrink-0 pr-2">
        <div className="flex flex-row gap-10 items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={avatar} />
              <AvatarFallback className="bg-muted-foreground">{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <ProfileDropdown username={username} onLogoutClick={onLogoutClick} />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Modal
                  title="New Gist"
                  trigger={
                    <Button className="w-8 h-8 flex-shrink-0" size={'icon'} variant={'icon'}>
                      <LucidePencil className="w-4 h-4" />
                    </Button>
                  }
                  content={
                    <div className="flex flex-col gap-3">
                      <Input className="border-0 bg-background p-0 h-min font-bold" placeholder="Gist name" value={gistName} onChange={(e) => setGistName(e.target.value)} />
                      <Textarea className="border-0 bg-background p-0 font-normal" placeholder="Write content..." value={gistContent} onChange={(e) => setGistContent(e.target.value)} />
                    </div>
                  }
                  footer={
                    <MenuButton variant="default" size="sm" onClick={handleCreateGistClick} className="">
                      Create
                    </MenuButton>
                  }
                ></Modal>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Create a new Gist</span>
                <Shortcut letter="C" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-2">
          <MenuButton icon={<FileCodeIcon />} variant="menu" size="menu" letter="M" onClick={onMyGistsClick} href="/mygist" className="w-full">
            My Gists
          </MenuButton>
          <Modal
            trigger={
              <MenuButton icon={<PlusIcon />} variant="menu" size="menu" letter="T" className="w-full">
                Create team
              </MenuButton>
            }
            title="Create Team"
            content={
              <div className="flex flex-col gap-3">
                <Input className="border-0 bg-background p-0 h-min font-bold" placeholder="Team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              </div>
            }
            footer={
              <MenuButton variant="default" size="sm" onClick={() => onCreateTeamClick(teamName)} className="">
                Create
              </MenuButton>
            }
          ></Modal>
        </div>
        <TeamListFeature />
      </div>
      {children}
    </div>
  )
}
