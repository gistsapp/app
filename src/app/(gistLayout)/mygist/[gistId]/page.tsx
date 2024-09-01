'use client'
import React from 'react'
import MyGistIdPage from './page-ui'
import { useGist } from '@/lib/queries/gists.queries'
import { useToast } from '@/components/shadcn/use-toast'

interface MyGistIdFeaturePageProps {
  params: {
    gistId: string
  }
}

export default function MyGistIdFeaturePage({ params }: MyGistIdFeaturePageProps) {
  const { gistId } = params
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
  return <MyGistIdPage gist={data} onDownloadClick={onDownloadClick} onSaveClick={onSaveClick} />
}
