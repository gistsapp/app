import { Team } from '@/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../shadcn/accordion'
import { Button } from '../shadcn/button'
import MenuButton from './menu-button'
import { TeamSection } from './team-section'
import { TeamGistSection } from './team-gist-section'

interface TeamListProps {
  teams: Team[]
  onTeamGistClick: () => void
  onDeleteTeam: (id: string) => void
  onDeleteGist: (id: string) => void
}

export function TeamList({ teams, onTeamGistClick, onDeleteTeam, onDeleteGist }: TeamListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {teams.map((team) => (
        <AccordionItem key={team.name} value={team.name} className="border-none">
          <AccordionTrigger>
            <TeamSection title={team.name} onDeleteTeam={() => onDeleteTeam(team.id)} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {team.gists.map((gist) => (
              <TeamGistSection key={gist.id} gist={gist} team={team} onGistClick={onTeamGistClick} onDeleteGist={() => onDeleteGist(gist.id)} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
