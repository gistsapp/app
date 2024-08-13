import GistDetails from '@/components/ui/gist-details'
import React from 'react'

interface MyTeamGistIdFeaturePageProps {
  params: {
    teamId: string
    gistId: string
  }
}

// TODO: Get the teams and gist from the params id and pass it to the GistDetails component

const gistMock = {
  id: '1',
  name: 'My first Gist',
  code: 'console.log("Hello, World!")',
}

const folderMock = 'Team A'

export default function MyTeamGistIdFeaturePage({ params }: MyTeamGistIdFeaturePageProps) {
  const { teamId, gistId } = params
  return <GistDetails folder={folderMock} gist={gistMock} />
}
