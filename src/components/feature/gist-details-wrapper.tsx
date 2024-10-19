'use client'

import { useState, useEffect, useCallback } from 'react'
import { Gist } from '@/types'
import GistLanding from '@/components/ui/gist-landing'
import { toast } from '../shadcn/use-toast'
import { useRouter } from 'next/navigation'
import { useKeyPress } from '@/lib/hook/use-key-press'
import { getLanguage } from '@/lib/language'

console.log(`
  _______    ________  ______   _________  ______         ________   ______   ______    
 /______/\\  /_______/\\/_____/\\ /________/\\/_____/\\       /_______/\\ /_____/\\ /_____/\\   
 \\::::__\\/__\\__.::._\\/\\::::_\\/_\\__.::.__\\/\\::::_\\/_      \\::: _  \\ \\\\:::_ \\ \\\\:::_ \\ \\  
  \\:\\ /____/\\  \\::\\ \\  \\:\\/___/\\  \\::\\ \\   \\:\\/___/\\   ___\\::(_)  \\ \\\\:(_) \\ \\\\:(_) \\ \\ 
   \\:\\\\_  _\\/  _\\::\\ \\__\\_::._\\:\\  \\::\\ \\   \\_::._\\:\\ /__/\\\\:: __  \\ \\\\: ___\\/ \\: ___\\/ 
    \\:\\_\\ \\ \\ /__\\::\\__/\\ /____\\:\\  \\::\\ \\    /____\\:\\\\::\\ \\\\:.\\ \\  \\ \\\\ \\ \\    \\ \\ \\   
     \\_____\\/ \\________\\/ \\_____\\/   \\__\\/    \\_____\\/ \\:_\\/ \\__\\/\\__\\/ \\_\\/     \\_\\/   
    \n
  Your snippet vault
     `)

export default function GistDetailsWrapper() {
  const router = useRouter()
  const [gist, setGist] = useState<Gist>({
    id: 'example',
    description: '',
    language: {
      name: 'plaintext',
      extension: 'txt',
    },
    name: '',
    code: '',
  })
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState(gist.language.extension)

  useEffect(() => {
    setSelectedLanguage(gist.language.extension)
  }, [gist.language.extension])

  useEffect(() => {
    const storedGistDescription = localStorage.getItem('gistDescription') || ''
    const storedGistName = localStorage.getItem('gistName') || ''
    const storedGistCode = localStorage.getItem('gistCode') || ''
    const storedGistExtension = localStorage.getItem('gistExtension') || ''
    setGist((prevGist) => ({
      ...prevGist,
      description: storedGistDescription,
      language: {
        ...prevGist.language,
        extension: storedGistExtension,
      },
      name: storedGistName,
      code: storedGistCode,
    }))
  }, [])

  const handleDownload = useCallback((name: string, code: string) => {
    const element = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = name
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast({
      title: 'Gist Downloaded',
      description: 'Your gist has been downloaded successfully',
    })
  }, [])

  const handleShare = useCallback(() => {}, [])

  const handleLogin = useCallback(() => {
    router.push('/login')
  }, [router])

  const handleShareDialog = useCallback(() => {
    setIsShareDialogOpen(true)
  }, [])

  const handleGistExtensionChange = useCallback((newExtension: string) => {
    setGist((prevGist) => ({
      ...prevGist,
      language: {
        ...prevGist.language,
        extension: newExtension,
      },
    }))
    localStorage.setItem('gistExtension', newExtension)
  }, [])

  const handleGistNameChange = useCallback((newName: string) => {
    const detectedLanguage = getLanguage(newName)
    setSelectedLanguage(detectedLanguage)
    handleGistExtensionChange(detectedLanguage)
    setGist((prevGist) => ({ ...prevGist, name: newName }))
    localStorage.setItem('gistName', newName)
  }, [])

  const handleGistDescriptionChange = useCallback((newDescription: string) => {
    setGist((prevGist) => ({ ...prevGist, description: newDescription }))
    localStorage.setItem('gistDescription', newDescription)
  }, [])

  const handleGistCodeChange = useCallback((newCode: string) => {
    setGist((prevGist) => ({ ...prevGist, code: newCode }))

    localStorage.setItem('gistCode', newCode)
  }, [])

  const handleOpenFile = useCallback(() => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]
      if (file) {
        handleGistNameChange(file.name)
        const reader = new FileReader()
        reader.onload = (e) => {
          const fileContent = e.target?.result as string
          handleGistCodeChange(fileContent)
        }
        reader.readAsText(file)
      }
    }
    fileInput.click()
  }, [handleGistNameChange, handleGistCodeChange])

  const handleKeyPressDownload = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      handleDownload(gist.name, gist.code)
    },
    [gist.name, gist.code, handleDownload]
  )

  const handleKeyPressOpenFile = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      handleOpenFile()
    },
    [handleOpenFile]
  )

  useKeyPress('d', handleKeyPressDownload, ['ctrlKey'])
  useKeyPress('l', handleLogin, ['ctrlKey'])
  useKeyPress('o', handleKeyPressOpenFile, ['ctrlKey'])
  useKeyPress('s', handleShareDialog, ['ctrlKey', 'shiftKey'])

  return (
    <GistLanding
      gist={gist}
      onShareDialog={handleShareDialog}
      onLogin={handleLogin}
      onDownload={handleDownload}
      onShare={handleShare}
      onGistExtensionChange={handleGistExtensionChange}
      onGistDescriptionChange={handleGistDescriptionChange}
      onGistNameChange={handleGistNameChange}
      onGistCodeChange={handleGistCodeChange}
      onOpenFile={handleOpenFile}
      isShareDialogOpen={isShareDialogOpen}
      setIsShareDialogOpen={setIsShareDialogOpen}
      selectedLanguage={selectedLanguage}
    />
  )
}
