import React from 'react'
import GistPage from './page-ui'

interface GistFeaturePageProps {}

// TODO: Get the gist from the params id and pass it to the GistPage component

const gistMock = {
  id: '1',
  name: 'My first Gist',
  code: 'console.log("Hello, World!")',
}

export default function GistFeaturePage({}: GistFeaturePageProps) {
  return <GistPage gist={gistMock} />
}
