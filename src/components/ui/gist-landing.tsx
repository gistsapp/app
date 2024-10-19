import { Badge } from '@/components/shadcn/badge'
import { Input } from '@/components/shadcn/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import MenuButton from '@/components/ui/menu-button'
import Shortcut from '@/components/ui/shortcut'
import { Gist } from '@/types'
import { ChevronRightIcon, DownloadIcon, FolderOpen, LogIn, ShareIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Codearea } from '../shadcn/codearea'
import { getLanguage } from '@/lib/language'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../shadcn/dialog'
import { Button } from '../shadcn/button'
import { SelectLangage } from './select-langage'
import GistCodeblock from './gist-codeblock'

interface GistLandingProps {
  gist: Gist
  onDownload: (name: string, code: string) => void
  onLogin: () => void
  onShare: () => void
  onShareDialog: () => void
  onGistExtensionChange: (extension: string) => void
  onGistDescriptionChange: (description: string) => void
  onGistNameChange: (name: string) => void
  onGistCodeChange: (code: string) => void
  onOpenFile: () => void
  isShareDialogOpen: boolean
  setIsShareDialogOpen: (isOpen: boolean) => void
  selectedLanguage: string
}

export default function GistLanding({
  gist,
  onDownload,
  onLogin,
  onShare,
  onShareDialog,
  onGistExtensionChange,
  onGistDescriptionChange,
  onGistNameChange,
  onGistCodeChange,
  onOpenFile,
  isShareDialogOpen,
  setIsShareDialogOpen,
  selectedLanguage,
}: GistLandingProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleGistDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGistDescriptionChange(e.target.value)
  }

  const handleGistNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value
      onGistNameChange(newName)
      const detectedLanguage = getLanguage(newName)
      onGistExtensionChange(detectedLanguage)
    },
    [onGistNameChange, onGistExtensionChange]
  )

  const handleGistExtensionChange = (newExtension: string) => {
    onGistExtensionChange(newExtension)
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
          <span className="hidden sm:block">{gist.description}</span>
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
      <GistCodeblock
        gist={gist}
        handleGistLangageChange={handleGistExtensionChange}
        handleGistDescriptionChange={handleGistDescriptionChange}
        handleGistNameChange={handleGistNameChange}
        handleGistCodeChange={handleGistCodeChange}
        handleOpenFileClick={handleOpenFileClick}
        onLogin={onLogin}
        selectedLanguage={selectedLanguage}
        showLandingInformations={showLandingInformations}
      />
      {/* <div className="h-full flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-6 group">
          <Badge variant="section" className="w-fit">
            Description
          </Badge>
          <Input placeholder="Gist description..." value={gist.description} onChange={handleGistDescriptionChange} className="rounded-none h-fit" />
        </div>
        <div className="flex flex-col gap-6 group h-full">
          <div className="flex flex-row justify-between">
            <Badge variant="section" className="w-fit">
              File
            </Badge>
            <SelectLangage languageDetect={gist.language.extension} onLanguageChange={handleGistExtensionChange} />
          </div>
          <Input placeholder="Filename including extension..." value={gist.name} onChange={handleGistNameChange} className="rounded-none h-fit" />
          <Codearea placeholder="Try it, and write your code here" value={gist.code} onChange={handleGistCodeChange} className="rounded-none flex-grow" language={gist.language.extension} />

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
      </div> */}
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
