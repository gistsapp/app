import { FolderOpen, LogIn } from 'lucide-react'
import { Codearea } from '../shadcn/codearea'
import { Input } from '../shadcn/input'
import { SelectLangage } from './select-langage'
import { Badge } from '../shadcn/badge'
import { Gist } from '@/types'

interface GistCodeblockProps {
  gist: Gist
  handleGistLangageChange: (extension: string) => void
  handleGistDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleGistNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleGistCodeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleOpenFileClick: () => void
  selectedLanguage: string
  onLogin?: () => void
  showLandingInformations?: boolean
}

export default function GistCodeblock({
  gist,
  handleGistLangageChange,
  handleGistDescriptionChange,
  handleGistNameChange,
  handleGistCodeChange,
  handleOpenFileClick,
  selectedLanguage,
  onLogin,
  showLandingInformations,
}: GistCodeblockProps) {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
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
          <SelectLangage languageDetect={selectedLanguage} onLanguageChange={handleGistLangageChange} />
        </div>
        <Input placeholder="Filename including extension..." value={gist.name} onChange={handleGistNameChange} className="rounded-none h-fit" />
        {/* <div className="h-full bg-background w-16 border border-input border-r-0 px-3 py-2 text-sm flex justify-center items-start">1</div> */}
        <Codearea placeholder="Try it, and write your code here" value={gist.code} onChange={handleGistCodeChange} className="rounded-none flex-grow" language={'txt'} />

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
  )
}
