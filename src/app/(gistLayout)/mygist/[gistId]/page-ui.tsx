import { Badge } from '@/components/shadcn/badge'
import { Input } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import HeaderButton from '@/components/ui/header-button'
import MenuButton from '@/components/ui/menu-button'
import Shortcut from '@/components/ui/shortcut'
import { ChevronRightIcon, DownloadIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'

interface GistPageProps {
  gist: Gist
}

export default function GistPage({ gist }: GistPageProps) {
  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Link href="/mygist" className="hover:underline">
            My Gists
          </Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span>{gist.name}</span>
        </div>
        <MenuButton icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
          <span>Download</span>
        </MenuButton>
      </div>
      <div className="h-[1px] bg-border"></div>
      <div className="h-full flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-6 group">
          <Badge variant="section" className="w-min">
            Name
          </Badge>
          <Input placeholder="Enter your gist name here" value={gist.name} className="rounded-none" />
        </div>
        <div className="h-full flex flex-col gap-6 group">
          <Badge variant="section" className="w-min">
            Code
          </Badge>
          <div className="flex flex-row h-full">
            <div className="h-full bg-background w-16 border border-input border-r-0 px-3 py-2 text-sm flex justify-center items-start">1</div>
            <Textarea placeholder="Enter your code here" value={gist.code} className="rounded-none h-full border-l-0" />
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-border"></div>
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
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
              <TooltipTrigger>
                <MenuButton icon={<DownloadIcon className="w-4 h-4" />} variant={'menu'}>
                  <span>Share</span>
                </MenuButton>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Share your gist</span>
                <Shortcut letter="Ctrl" />
                <span>+</span>
                <Shortcut letter="Maj" />
                <span>+</span>
                <Shortcut letter="S" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MenuButton variant={'menu'}>
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
