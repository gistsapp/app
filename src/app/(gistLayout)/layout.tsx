'use client'

import { ReactNode } from 'react'
import GistLayout from './layout-ui'

export default function GistLayoutFeature({ children }: { children: ReactNode }) {
  const usernameMock = 'Rapidement'

  const onMyGistsClick = () => {
    console.log('My Gists clicked')
  }

  const onCreateTeamClick = () => {
    console.log('Create team clicked')
  }

  return (
    <GistLayout username={usernameMock} onCreateTeamClick={onCreateTeamClick} onMyGistsClick={onMyGistsClick}>
      {children}
    </GistLayout>
  )
}
