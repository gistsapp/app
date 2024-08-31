import { Team } from '@/types'
import { TeamList } from '../ui/team-list'
import { useOrgs } from '@/lib/queries/orgs.queries'

interface TeamListFeatureProps {}

// TODO: Get the teams list

const teamsMock: Team[] = [
  {
    id: '1',
    name: 'Team A',
    gists: [
      {
        id: '1',
        name: 'Gist 1',
        code: 'console.log("Hello, World!")',
      },
      {
        id: '2',
        name: 'Gist 2',
        code: 'console.log("Hello, World!")',
      },
    ],
  },
  {
    id: '2',
    name: 'Team B',
    gists: [
      {
        id: '3',
        name: 'Gist 3',
        code: 'console.log("Hello, World!")',
      },
      {
        id: '4',
        name: 'Gist 4',
        code: 'console.log("Hello, World!")',
      },
    ],
  },
]

const onTeamGistClick = () => {
  console.log('Team Gist Clicked')
}

const onDeleteTeam = (id: string) => {
  console.log(`Deleting team with ID: ${id}`)
}

const onDeleteGist = (id: string) => {
  console.log(`Deleting gist with ID: ${id}`)
}

export function TeamListFeature() {
  const { data, error, isPending } = useOrgs()
  console.log(data)
  return <TeamList teams={data || []} onTeamGistClick={onTeamGistClick} onDeleteTeam={onDeleteTeam} onDeleteGist={onDeleteGist} />
}
