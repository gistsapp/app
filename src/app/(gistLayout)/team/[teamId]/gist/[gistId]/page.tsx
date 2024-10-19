'use client'
import { useToast } from '@/components/shadcn/use-toast'
import GistDetails from '@/components/ui/gist-details'
import { useGist, usePatchGistContent, usePatchGistName } from '@/lib/queries/gists.queries'
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
  const { mutate: updateName } = usePatchGistName({
    onSuccess: () => {},
  })

  const { mutate: updateContent } = usePatchGistContent({
    onSuccess: () => {},
  })

  const onDownloadClick = () => {
    toast({
      title: 'Gist Downloaded',
      description: 'Your gist has been downloaded successfully',
    })
  }

  const onSaveClick = (name: string, code: string) => {
    updateContent({ id: gistId, content: code })
    updateName({ id: gistId, name })
    toast({
      title: 'Gist Saved',
      description: 'Your gist has been saved successfully a ',
    })
    console.log('Gist Saved')
  }

  if (!data) {
    return null
  }

  return <GistDetails folder={folderMock} gist={data} onDownloadClick={onDownloadClick} onSaveClick={onSaveClick} />
}
