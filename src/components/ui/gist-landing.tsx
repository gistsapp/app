import { Badge } from '@/components/shadcn/badge'
import { Input } from '@/components/shadcn/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import MenuButton from '@/components/ui/menu-button'
import Shortcut from '@/components/ui/shortcut'
import { Gist } from '@/types'
import { ChevronRightIcon, DownloadIcon, LogIn, Trash2Icon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Codearea } from '../shadcn/codearea'
import { getLanguage } from '@/lib/language'
import { toast } from '../shadcn/use-toast'
import { redirect } from 'next/navigation'

interface GistLandingProps {
  gist: Gist
  onDownloadClick?: () => void
  onSaveClick: (name: string, code: string) => void
}

export default function GistLanding({ gist, onDownloadClick, onSaveClick }: GistLandingProps) {
  const [gistName, setGistName] = useState(gist.name)
  const [gistCode, setGistCode] = useState(gist.code)

  const language = getLanguage(gistName)

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([gistCode], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = gistName
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast({
      title: 'Gist Downloaded',
      description: 'Your gist has been downloaded successfully',
    })
  }

  const handleLogin = () => {
    console.log('login')
    redirect('/login')
  }

  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <span>Welcome in Gists.app</span>
          <ChevronRightIcon className="w-4 h-4" />
          <span>{gistName}</span>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MenuButton onClick={handleLogin} icon={<LogIn className="w-4 h-4" />} variant={'header'}>
                  <span>Login</span>
                </MenuButton>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Login</span>
                <Shortcut letter="Ctrl" />
                <span>+</span>
                <Shortcut letter="L" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MenuButton onClick={handleDownload} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
                  <span>Download</span>
                </MenuButton>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                <span>Download your Gist</span>
                <Shortcut letter="Ctrl" />
                <span>+</span>
                <Shortcut letter="D" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
            <div className="h-full bg-background w-16 border border-input border-r-0 px-3 py-2 text-sm flex justify-center items-start">1</div>
            <Codearea placeholder="Enter your code here" value={gistCode} onChange={(e) => setGistCode(e.target.value)} className="rounded-none h-full border-l-0" language={language} />
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-border"></div>
      <div className="py-4 px-6 flex flex-row justify-end items-center">
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
      </div>
    </div>
  )
}
