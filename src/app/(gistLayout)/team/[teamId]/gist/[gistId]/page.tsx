import React from 'react'

interface GroupGistPageProps {
  params: {
    groupId: string
    gistId: string
  }
}

export default function GroupGistPage({ params }: GroupGistPageProps) {
  const { groupId, gistId } = params
  return (
    <h1>
      Group Gist Page: Group {groupId}, Gist {gistId}
    </h1>
  )
}
