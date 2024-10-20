import { TeamList } from '../ui/team-list'
import { useDeleteOrgs, useOrgs } from '@/lib/queries/orgs.queries'

export function TeamListFeature() {
  const { data, error, isPending } = useOrgs()
  const { mutate } = useDeleteOrgs({ onSuccess: () => console.log('Deleted') })

  const onDeleteTeam = (id: string) => {
    mutate(id)
  }

  const onTeamGistClick = () => {
    console.log('Team Gist Clicked')
  }

  const onDeleteGist = (id: string) => {
    console.log(`Deleting gist with ID: ${id}`)
  }

  const onUpdateTeamClick = (id: string, name: string) => {
    console.log(`Updating team with ID: ${id} and name: ${name}`)
  }

  return <TeamList teams={data || []} onTeamGistClick={onTeamGistClick} onDeleteTeam={onDeleteTeam} onDeleteGist={onDeleteGist} onUpdateTeamClick={onUpdateTeamClick} />
}
