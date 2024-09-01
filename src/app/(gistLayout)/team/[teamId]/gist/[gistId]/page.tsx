'use client'
import { useToast } from '@/components/shadcn/use-toast'
import GistDetails from '@/components/ui/gist-details'
import { useGist } from '@/lib/queries/gists.queries'
import React from 'react'

interface MyTeamGistIdFeaturePageProps {
  params: {
    teamId: string
    gistId: string
  }
}

const folderMock = 'Team A'

export default function MyTeamGistIdFeaturePage({ params }: MyTeamGistIdFeaturePageProps) {
  const { teamId, gistId } = params
  const { data } = useGist(gistId)
  const { toast } = useToast()

  const onDownloadClick = () => {
    console.log('Downloading gist')
    toast({
      title: 'Gist Downloaded',
      description: 'Your gist has been downloaded successfully',
    })
  }

  const onSaveClick = (name: string, code: string) => {
    console.log('Saving gist with name:', name, 'and code:', code)
    toast({
      title: 'Gist Saved',
      description: 'Your gist has been saved successfully',
    })
  }

  if (!data) {
    return null
  }

  return <GistDetails folder={folderMock} gist={data} onDownloadClick={onDownloadClick} onSaveClick={onSaveClick} />
}
