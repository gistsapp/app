import { Badge } from '@/components/shadcn/badge'
import { Input } from '@/components/shadcn/input'
import MenuButton from '@/components/ui/menu-button'
import { Gist } from '@/types'
import { ChevronRightIcon, DownloadIcon, ShareIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Codearea } from '../shadcn/codearea'
import { getLanguage } from '@/lib/language'
import TooltipShortcut, { TooltipShortcutTrigger } from './tooltip-shortcut'

interface GistDetailsProps {
  gist: Gist
  orgName: string
  redirect?: boolean
  onDownload: (name: string, code: string) => void
  onShare: () => void
  onDelete: (id: string) => void
  onSave: (name: string, code: string) => void
}

export default function GistDetails({ gist, orgName, redirect, onDownload, onShare, onDelete, onSave }: GistDetailsProps) {
  const [gistId] = useState(gist.id)
  const [gistName, setGistName] = useState(gist.name)
  const [gistCode, setGistCode] = useState(gist.code)

  const gistState: Gist = {
    id: gistId,
    name: gistName,
    code: gistCode,
  }

  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <Header gist={gistState} orgName={orgName} redirect={redirect} onDownload={() => onDownload(gistName, gistCode)} />
      <div className="h-[1px] bg-border"></div>
      <div className="h-full flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-6 group">
          <Badge variant="section" className="w-fit">
            File name
          </Badge>
          <Input placeholder="Enter your gist name here" value={gistName} onChange={(e) => setGistName(e.target.value)} className="rounded-none" />
        </div>
        <div className="h-full flex flex-col gap-6 group">
          <Badge variant="section" className="w-min">
            Code
          </Badge>
          <div className="flex flex-row h-full">
            {/* <div className="h-full bg-background w-16 border border-input border-r-0 px-3 py-2 text-sm flex justify-center items-start">1</div> */}
            <Codearea placeholder="Enter your code here" value={gistCode} onChange={(e) => setGistCode(e.target.value)} className="rounded-none h-full" language={getLanguage(gistName)} />
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-border"></div>
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <TooltipShortcut tooltip="Delete" shortcuts={['Del']}>
          <TooltipShortcutTrigger>
            <MenuButton onClick={() => onDelete(gistId)} variant={'menu'} icon={<Trash2Icon className="w-4 h-4" />}>
              <span>Delete</span>
            </MenuButton>
          </TooltipShortcutTrigger>
        </TooltipShortcut>
        <div className="flex flex-row gap-4">
          <TooltipShortcut tooltip="Share" shortcuts={['Ctrl', 'Shft', 'S']}>
            <TooltipShortcutTrigger>
              <MenuButton className="hidden sm:flex" onClick={onShare} icon={<ShareIcon className="w-4 h-4" />} variant={'menu'}>
                <span>Share</span>
              </MenuButton>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
          <TooltipShortcut tooltip="Save" shortcuts={['Ctrl', 'S']}>
            <TooltipShortcutTrigger>
              <MenuButton onClick={() => onSave(gistName, gistCode)} variant={'menu'}>
                <span>Save</span>
              </MenuButton>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
        </div>
      </div>
    </div>
  )
}

interface HeaderProps {
  gist: Gist
  orgName: string
  redirect?: boolean
  onDownload: (name: string, code: string) => void
}

function Header({ gist, orgName, redirect, onDownload }: HeaderProps) {
  return (
    <div className="py-4 px-6 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 justify-center items-center">
        {redirect ? (
          <Link href="/mygist" className="hover:underline">
            {orgName}
          </Link>
        ) : (
          <span>{orgName}</span>
        )}
        <ChevronRightIcon className="w-4 h-4" />
        <span>{gist.name}</span>
      </div>
      <TooltipShortcut tooltip="Download" shortcuts={['Ctrl', 'D']}>
        <TooltipShortcutTrigger>
          <MenuButton className="hidden sm:flex" onClick={() => onDownload(gist.name, gist.code)} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
            <span>Download</span>
          </MenuButton>
        </TooltipShortcutTrigger>
      </TooltipShortcut>
    </div>
  )
}
