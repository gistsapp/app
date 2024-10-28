'use client'
import { useToast } from '@/components/shadcn/use-toast'
import GistDetails from '@/components/ui/gist-details'
import { useGist, usePatchGistContent, usePatchGistName } from '@/lib/queries/gists.queries'
import { useOrg } from '@/lib/queries/orgs.queries'
import React from 'react'

interface MyOrgGistIdFeaturePageProps {
  params: {
    orgId: string
    gistId: string
  }
}

export default function MyOrgGistIdFeaturePage({ params }: MyOrgGistIdFeaturePageProps) {
  const { orgId, gistId } = params
  const { data: orgData } = useOrg(orgId)
  const { data: gistData } = useGist(gistId)
  const { toast } = useToast()
  const { mutate: updateName } = usePatchGistName({
    onSuccess: () => {
      toast({
        title: 'Gist Saved',
        description: 'Your gist has been saved successfully a ',
      })
    },
  })

  const { mutate: updateContent } = usePatchGistContent({
    onSuccess: () => {},
  })

  const onDownload = () => {
    toast({
      title: 'Gist Downloaded',
      description: 'Your gist has been downloaded successfully',
    })
  }

  const onSave = (name: string, code: string) => {
    updateContent({ id: gistId, content: code })
    updateName({ id: gistId, name })
    toast({
      title: 'Gist Saved',
      description: 'Your gist has been saved successfully',
    })
  }

  const onShare = () => {
    console.log('Share')
  }

  const onDelete = (id: string) => {
    console.log(`Deleting gist with ID: ${id}`)
  }

  if (!gistData) {
    return null
  }

  return <GistDetails orgName={orgData ? orgData.name : 'My Gists'} gist={gistData} onDownload={onDownload} onSave={onSave} onShare={onShare} onDelete={onDelete} />
}
