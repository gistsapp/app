'use client'

import { Gist } from '@/types'
import GistLanding from '@/components/ui/gist-landing'

export default function GistDetailsWrapper() {
  const handleDownloadClick = () => {
    // Logique du bouton télécharger
  }

  const handleSaveClick = (name: string, code: string) => {
    // Logique du bouton sauvegarder
  }
  const gist: Gist = {
    id: 'exemple',
    name: 'Gist example',
    code: 'Try it, and write your code here',
  }

  return <GistLanding gist={gist} onDownloadClick={handleDownloadClick} onSaveClick={handleSaveClick} />
}
