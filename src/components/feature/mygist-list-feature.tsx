'use client'
import { Gist } from '@/types'
import MyGistList from '../ui/mygist-list'
import { useGists } from '@/lib/queries/gists.queries'

// TODO: Get the gists list

const gistMock: Gist[] = [
  {
    id: '1',
    name: 'My first Gist',
    code: 'console.log("Hello, World!")',
  },
  {
    id: '2',
    name: 'My second Gist',
    code: 'console.log("Hello, World!")',
  },
  {
    id: '3',
    name: 'My third Gist',
    code: 'console.log("Hello, World!")',
  },
  {
    id: '4',
    name: 'My fourth Gist',
    code: 'console.log("Hello, World!")',
  },
]

const handleDeleteGist = (id: string) => {
  console.log(`Deleting gist with ID: ${id}`)
}

export function MyGistListFeature() {
  const { data } = useGists()

  return <MyGistList gists={data || []} onDeleteGist={handleDeleteGist} />
}
