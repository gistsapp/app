import { Badge } from '@/components/shadcn/badge'
import { Input } from '@/components/shadcn/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import MenuButton from '@/components/ui/menu-button'
import Shortcut from '@/components/ui/shortcut'
import { Gist } from '@/types'
import { ChevronRightIcon, DownloadIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Codearea } from '../shadcn/codearea'
import { getLanguage } from '@/lib/language'

interface GistDetailsProps {
  gist: Gist
  folder: string
  redirect?: boolean
  onDownloadClick?: () => void
  onSaveClick: (name: string, code: string) => void
}

export default function GistDetails({ gist, folder, redirect, onDownloadClick, onSaveClick }: GistDetailsProps) {
  const [gistName, setGistName] = useState(gist.name)
  const [gistCode, setGistCode] = useState(gist.code)

  const language = getLanguage(gistName)

  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          {redirect ? (
            <Link href="/mygist" className="hover:underline">
              {folder}
            </Link>
          ) : (
            <span>{folder}</span>
          )}
          <ChevronRightIcon className="w-4 h-4" />
          <span>{gistName}</span>
        </div>
        <MenuButton onClick={onDownloadClick} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
          <span>Download</span>
        </MenuButton>
      </div>
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
            <Codearea placeholder="Enter your code here" value={gistCode} onChange={(e) => setGistCode(e.target.value)} className="rounded-none h-full" language={language} />
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-border"></div>
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenuButton icon={<Trash2Icon className="w-4 h-4" />} variant={'menu'}>
                <span>Delete</span>
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent className="flex flex-row gap-2 justify-center items-center">
              <span>Delete your gist</span>
              <Shortcut letter="Del" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-row gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuButton icon={<DownloadIcon className="w-4 h-4" />} variant={'menu'}>
                  <span>Share</span>
                </MenuButton>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Share your gist</span>
                <Shortcut letter="Ctrl" />
                <span>+</span>
                <Shortcut letter="Shft" />
                <span>+</span>
                <Shortcut letter="S" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuButton variant={'menu'} onClick={() => onSaveClick(gistName, gistCode)}>
                  <span>Save</span>
                </MenuButton>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Save your gist</span>
                <Shortcut letter="Ctrl" />
                <span>+</span>
                <Shortcut letter="S" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
