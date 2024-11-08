import MenuButton from '@/components/ui/menu-button'
import { Gist } from '@/types'
import { ChevronRightIcon, DownloadIcon, FolderOpen, LogIn, ShareIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../shadcn/dialog'
import { Button } from '../shadcn/button'
import Link from 'next/link'
import CodeBlock, { CodeBlockLanding } from './codeblock'
import TooltipShortcut, { TooltipShortcutTrigger } from './tooltip-shortcut'

interface GistLandingProps {
  gist: Gist
  onDownload: (name: string, code: string) => void
  onShare: () => void
  onShareDialog: () => void
  onGistNameChange: (name: string) => void
  onGistCodeChange: (code: string) => void
  onOpenFile: () => void
  isShareDialogOpen: boolean
  setIsShareDialogOpen: (isOpen: boolean) => void
}

export default function GistLanding({ gist, onDownload, onShare, onShareDialog, onGistNameChange, onGistCodeChange, onOpenFile, isShareDialogOpen, setIsShareDialogOpen }: GistLandingProps) {
  return (
    <div className="flex flex-col w-full h-full border-border rounded-lg border">
      <Header gist={gist} onDownload={onDownload} />
      <div className="h-[1px] bg-border"></div>
      <CodeBlock gist={gist} onGistNameChange={onGistNameChange} onGistCodeChange={onGistCodeChange}>
        {gist.code === '' && (
          <CodeBlockLanding>
            <div className="w-full sm:w-auto px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
              <div className="flex flex-row gap-2 items-center justify-center w-full">
                <h3>GISTS</h3>
                <div className="w-[6px] h-[28px] bg-primary animate-blink"></div>
              </div>
              <p className="font-mono text-sm sm:text-base text-slate-400 my-4">All your data is saved locally in your browser, so just start typing.</p>
              <div className="flex-col gap-4 w-3/4 hidden sm:flex">
                <div className="flex flex-row justify-between font-mono text-slate-400">
                  <div className="flex flex-row gap-2 cursor-pointer" onClick={onOpenFile}>
                    <FolderOpen className="w-6 h-6" />
                    <p>Open</p>
                  </div>
                  <p>Ctrl + O</p>
                </div>
                <div className="flex flex-row justify-between font-mono text-slate-400">
                  <Link href="/login" className="flex flex-row gap-2 cursor-pointer">
                    <LogIn className="w-6 h-6" />
                    <p>Log In</p>
                  </Link>
                  <p>Ctrl + L</p>
                </div>
              </div>
            </div>
          </CodeBlockLanding>
        )}
      </CodeBlock>
      <div className="h-[1px] bg-border"></div>
      <Footer gist={gist} onDownload={onDownload} isShareDialogOpen={isShareDialogOpen} setIsShareDialogOpen={setIsShareDialogOpen} onShareDialog={onShareDialog} onShare={onShare} />
    </div>
  )
}

interface HeaderProps {
  gist: Gist
  onDownload: (name: string, code: string) => void
}

function Header({ gist, onDownload }: HeaderProps) {
  return (
    <div className="py-4 px-6 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 justify-center items-center">
        <h1 className="text-base font-normal">Gists</h1>
        <ChevronRightIcon className="w-4 h-4 hidden sm:block" />
        <span className="hidden sm:block">{gist.name}</span>
      </div>
      <div className="flex flex-row gap-0 sm:gap-4 justify-center items-center">
        <TooltipShortcut tooltip="Login" shortcuts={['Ctrl', 'L']}>
          <TooltipShortcutTrigger>
            <MenuButton href="/login" icon={<LogIn className="w-4 h-4" />} variant={'header'}>
              <h2 className="text-sm font-normal">Login</h2>
            </MenuButton>
          </TooltipShortcutTrigger>
        </TooltipShortcut>
        <TooltipShortcut tooltip="Download" shortcuts={['Ctrl', 'D']}>
          <TooltipShortcutTrigger>
            <MenuButton className="hidden sm:flex" onClick={() => onDownload(gist.name, gist.code)} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
              <span>Download</span>
            </MenuButton>
          </TooltipShortcutTrigger>
        </TooltipShortcut>
      </div>
    </div>
  )
}

interface FooterProps {
  gist: Gist
  onDownload: (name: string, code: string) => void
  isShareDialogOpen: boolean
  setIsShareDialogOpen: (isOpen: boolean) => void
  onShareDialog: () => void
  onShare: () => void
}

function Footer({ gist, onDownload, isShareDialogOpen, setIsShareDialogOpen, onShareDialog, onShare }: FooterProps) {
  return (
    <div className="py-4 px-6 flex flex-row justify-between sm:justify-end items-center gap-4">
      <TooltipShortcut tooltip="Download" shortcuts={['Ctrl', 'D']}>
        <TooltipShortcutTrigger>
          <MenuButton className="sm:hidden" onClick={() => onDownload(gist.name, gist.code)} icon={<DownloadIcon className="w-4 h-4" />} variant={'header'}>
            <span>Download</span>
          </MenuButton>
        </TooltipShortcutTrigger>
      </TooltipShortcut>
      <ShareDialog isShareDialogOpen={isShareDialogOpen} setIsShareDialogOpen={setIsShareDialogOpen} onShareDialog={onShareDialog} onShare={onShare} />
    </div>
  )
}

interface ShareDialogProps {
  isShareDialogOpen: boolean
  setIsShareDialogOpen: (isOpen: boolean) => void
  onShareDialog: () => void
  onShare: () => void
}

function ShareDialog({ isShareDialogOpen, setIsShareDialogOpen, onShareDialog, onShare }: ShareDialogProps) {
  return (
    <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipShortcut tooltip="Share" shortcuts={['Ctrl', 'Shft', 'S']}>
            <TooltipShortcutTrigger>
              <MenuButton onClick={onShareDialog} icon={<ShareIcon className="w-4 h-4" />} variant={'header'}>
                <span>Share</span>
              </MenuButton>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
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
        <Link href="/login" className="w-fit">
          <Button>Log in</Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
