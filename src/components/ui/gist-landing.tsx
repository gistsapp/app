import { Badge } from '@/components/shadcn/badge'
import { Input } from '@/components/shadcn/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import MenuButton from '@/components/ui/menu-button'
import Shortcut from '@/components/ui/shortcut'
import { Gist } from '@/types'
import { ChevronRightIcon, DownloadIcon, FolderOpen, LogIn, ShareIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Codearea } from '../shadcn/codearea'
import { getLanguage } from '@/lib/language'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../shadcn/dialog'
import { Button } from '../shadcn/button'

interface GistLandingProps {
  gist: Gist
  onDownload: (name: string, code: string) => void
  onLogin: () => void
  onShare: () => void
  onShareDialog: () => void
  onGistNameChange: (name: string) => void
  onGistCodeChange: (code: string) => void
  onOpenFile: () => void
  isShareDialogOpen: boolean
  setIsShareDialogOpen: (isOpen: boolean) => void
}

export default function GistLanding({ gist, onDownload, onLogin, onShare, onShareDialog, onGistNameChange, onGistCodeChange, onOpenFile, isShareDialogOpen, setIsShareDialogOpen }: GistLandingProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const language = getLanguage(gist.name)

  const handleGistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGistNameChange(e.target.value)
  }

  const handleGistCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onGistCodeChange(e.target.value)
  }

  const handleOpenFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const showLandingInformations = gist.code === ''

  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <span>Welcome in Gists.app</span>
          <ChevronRightIcon className="w-4 h-4 hidden sm:block" />
          <span className="hidden sm:block">{gist.name}</span>
        </div>
        <div className="flex flex-row gap-0 sm:gap-4 justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuButton onClick={onLogin} icon={<LogIn className="w-4 h-4" />} variant={'header'}>
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
              <TooltipTrigger asChild>
                <MenuButton className="hidden sm:flex" onClick={() => onDownload(gist.name, gist.code)} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
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
          <Input placeholder="Enter your gist name here" value={gist.name} onChange={handleGistNameChange} className="rounded-none" />
        </div>
        <div className="h-full flex flex-col gap-6 group">
          <Badge variant="section" className="w-min">
            Code
          </Badge>
          <div className="flex flex-row h-full relative">
            {/* <div className="h-full bg-background w-16 border border-input border-r-0 px-3 py-2 text-sm flex justify-center items-start">1</div> */}
            <Codearea placeholder="Try it, and write your code here" value={gist.code} onChange={handleGistCodeChange} className="rounded-none h-full" language={language} />

            {showLandingInformations && (
              <div className="w-full sm:w-auto px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                <div className="flex flex-row gap-2 items-center justify-center w-full">
                  <h3>GISTS</h3>
                  <div className="w-[6px] h-[28px] bg-primary animate-blink"></div>
                </div>
                <p className="font-mono text-sm sm:text-base text-slate-400 my-4">All your data is saved locally in your browser, so just start typing.</p>
                <div className="flex-col gap-4 w-3/4 hidden sm:flex">
                  <div className="flex flex-row justify-between font-mono text-slate-400">
                    <div className="flex flex-row gap-2 cursor-pointer" onClick={handleOpenFileClick}>
                      <FolderOpen className="w-6 h-6" />
                      <p>Open</p>
                    </div>
                    <p>Ctrl + O</p>
                  </div>
                  <div className="flex flex-row justify-between font-mono text-slate-400">
                    <div className="flex flex-row gap-2 cursor-pointer" onClick={onLogin}>
                      <LogIn className="w-6 h-6" />
                      <p>Log In</p>
                    </div>
                    <p>Ctrl + L</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={onOpenFile} className="hidden" />
      <div className="h-[1px] bg-border"></div>
      <div className="py-4 px-6 flex flex-row justify-between sm:justify-end items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenuButton className="sm:hidden" onClick={() => onDownload(gist.name, gist.code)} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
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
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MenuButton onClick={onShareDialog} icon={<ShareIcon className="w-4 h-4" />} variant={'menu'}>
                      <span>Share</span>
                    </MenuButton>
                  </TooltipTrigger>
                  <TooltipContent className="flex flex-row gap-2 justify-center items-center">
                    <span>Share</span>
                    <Shortcut letter="Ctrl" />
                    <span>+</span>
                    <Shortcut letter="Shft" />
                    <span>+</span>
                    <Shortcut letter="S" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </DialogTrigger>
          <DialogContent className="p-10 text-center flex flex-col justify-center items-center gap-6" aria-describedby={undefined}>
            <DialogTitle>Share you code with friends !</DialogTitle>
            <p className="text-slate-400">You can share your code which will be valid for one week with people.</p>
            <Button onClick={onShare} className="w-fit">
              Share your code
            </Button>
            <div className="flex flex-row gap-2 w-full items-center">
              <div className="h-[1px] bg-border w-full"></div>
              <p className="text-slate-400 px-2">Or</p>
              <div className="h-[1px] bg-border w-full"></div>
            </div>
            <DialogTitle>Log in to Gists</DialogTitle>
            <p className="text-slate-400">Log in to save and share your code more easily.</p>
            <Button onClick={onLogin} className="w-fit">
              Log in
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
