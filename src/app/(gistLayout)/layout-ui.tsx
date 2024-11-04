import { OrgListFeature } from '@/components/logic/org-list-logic'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'
import { Button } from '@/components/shadcn/button'
import { Codearea } from '@/components/shadcn/codearea'
import { Input } from '@/components/shadcn/input'
import MenuButton from '@/components/ui/menu-button'
import { Modal } from '@/components/ui/modal'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import TooltipShortcut, { TooltipShortcutTrigger } from '@/components/ui/tooltip-shortcut'
import { getLanguage } from '@/lib/language'
import { FileCodeIcon, LucidePencil, Menu, PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface GistLayoutProps {
  username: string
  avatar: string
  children: React.ReactNode
  onMyGists: () => void
  onCreateOrg: (name: string) => void
  onCreateGist: (name: string) => void
  onLogout: () => void
}

export default function GistLayout({ avatar, children, username, onMyGists, onCreateOrg, onCreateGist, onLogout }: GistLayoutProps) {
  const [gistName, setGistName] = useState('')
  const [isGistModalOpen, setIsGistModalOpen] = useState(false)
  const [orgName, setOrgName] = useState('')
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false)

  return (
    <div className="w-full min-h-screen flex flex-row p-2">
      <div className="sticky top-2 h-screen">
        <div className="w-min flex flex-col gap-8 flex-shrink-0 pr-2">
          <div className="flex flex-row gap-10 items-center">
            <div className="flex flex-row justify-start items-center gap-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={avatar} />
                <AvatarFallback className="bg-muted-foreground">{username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <ProfileDropdown username={username} onLogout={onLogout} />
            </div>
            <CreateGistModal gistName={gistName} setGistName={setGistName} isGistModalOpen={isGistModalOpen} setIsGistModalOpen={setIsGistModalOpen} onCreateGist={onCreateGist} />
          </div>
          <div className="flex flex-col gap-2">
            <MenuButton icon={<FileCodeIcon />} variant="menu" size="menu" letter="M" onClick={onMyGists} href="/mygist" className="w-full">
              My Gists
            </MenuButton>
            <CreateOrgModal orgName={orgName} setOrgName={setOrgName} isOrgModalOpen={isOrgModalOpen} setIsOrgModalOpen={setIsOrgModalOpen} onCreateOrg={onCreateOrg} />
          </div>
          <OrgListFeature />
        </div>
      </div>
      {children}
    </div>
  )
}

interface CreateGistModalProps {
  gistName: string
  setGistName: (name: string) => void
  isGistModalOpen: boolean
  setIsGistModalOpen: (open: boolean) => void
  onCreateGist: (name: string) => void
}

function CreateGistModal({ gistName, setGistName, isGistModalOpen, setIsGistModalOpen, onCreateGist }: CreateGistModalProps) {
  return (
    <Modal
      open={isGistModalOpen}
      onOpenChange={setIsGistModalOpen}
      title="New Gist"
      trigger={
        <div>
          <TooltipShortcut tooltip="Create a new Gist" shortcuts={['C']}>
            <TooltipShortcutTrigger>
              <Button className="w-8 h-8 flex-shrink-0" size={'icon'} variant={'icon'}>
                <LucidePencil className="w-4 h-4" />
              </Button>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
        </div>
      }
      content={
        <div className="flex flex-col gap-3">
          <Input className="border-0 bg-background p-0 h-min font-bold" placeholder="Gist name" value={gistName} onChange={(e) => setGistName(e.target.value)} />
        </div>
      }
      footer={
        <MenuButton
          variant="default"
          size="sm"
          onClick={() => {
            onCreateGist(gistName)
            setGistName('')
            setIsGistModalOpen(false)
          }}
        >
          Create
        </MenuButton>
      }
    ></Modal>
  )
}

interface CreateOrgModalProps {
  orgName: string
  setOrgName: (name: string) => void
  isOrgModalOpen: boolean
  setIsOrgModalOpen: (open: boolean) => void
  onCreateOrg: (name: string) => void
}

function CreateOrgModal({ orgName, setOrgName, setIsOrgModalOpen, onCreateOrg, isOrgModalOpen }: CreateOrgModalProps) {
  return (
    <Modal
      open={isOrgModalOpen}
      onOpenChange={setIsOrgModalOpen}
      trigger={
        <MenuButton icon={<PlusIcon />} variant="menu" size="menu" letter="T" className="w-full">
          Create org
        </MenuButton>
      }
      title="Create Org"
      content={
        <div className="flex flex-col gap-3">
          <Input className="border-0 bg-background p-0 h-min font-bold" placeholder="Org name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </div>
      }
      footer={
        <MenuButton
          variant="default"
          size="sm"
          onClick={() => {
            onCreateOrg(orgName)
            setOrgName('')
            setIsOrgModalOpen(false)
          }}
        >
          Create
        </MenuButton>
      }
    />
  )
}
