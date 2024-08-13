import React from 'react'
import MyGistIdPage from './page-ui'

interface MyGistIdFeaturePageProps {
  params: {
    gistId: string
  }
}

// TODO: Get the gist from the params id and pass it to the GistDetails component

const gistMock = {
  id: '1',
  name: 'My first Gist',
  code: 'console.log("Hello, World!")',
}

export default function MyGistIdFeaturePage({ params }: MyGistIdFeaturePageProps) {
  const { gistId } = params
  return <MyGistIdPage gist={gistMock} />
}
