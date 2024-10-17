'use client'

import { ReactNode, useCallback } from 'react'
import GistLayout from './layout-ui'
import { useMe } from '@/lib/queries/user.queries'
import { useToast } from '@/components/shadcn/use-toast'
import { useCreateGist } from '@/lib/queries/gists.queries'
import { useCreateOrg } from '@/lib/queries/orgs.queries'

export default function GistLayoutFeature({ children }: { children: ReactNode }) {
  const { data } = useMe()
  const { toast } = useToast()
  const { mutate: createGist } = useCreateGist({
    onSuccess: () => {
      toast({
        title: 'Gist Created',
        description: 'Your gist has been created successfully',
      })
    },
  })

  const { mutate: createTeam } = useCreateOrg({
    onSuccess: () => {
      toast({
        title: 'Team Created',
        description: 'Your team has been created successfully',
      })
    },
  })

  const onMyGistsClick = () => {
  }

  const onCreateTeamClick = useCallback(
    (name: string) => {
      createTeam(name)
    },
    [toast, createTeam]
  )

  const onLogoutClick = () => {
  }

  const onCreateGistClick = (name: string, content: string) => {
    createGist({
      content,
      name,
    })
  }

  return (
    <GistLayout
      onLogoutClick={onLogoutClick}
      username={data?.name ?? ''}
      avatar={data?.picture ?? ''}
      onCreateTeamClick={onCreateTeamClick}
      onMyGistsClick={onMyGistsClick}
      onCreateGistClick={onCreateGistClick}
    >
      {children}
    </GistLayout>
  )
}
