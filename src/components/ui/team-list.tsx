import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../shadcn/accordion'
import { Button } from '../shadcn/button'
import { TeamSection } from './team-section'

interface TeamListProps {
  teams: Team[]
}

export function TeamList({ teams }: TeamListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {teams.map((team) => (
        <AccordionItem key={team.name} value={team.name} className="border-none">
          <AccordionTrigger>
            <TeamSection title={team.name} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {team.gists.map((gist) => (
              <Button key={gist.id} variant="menu" size="menu" className="flex flex-row justify-start w-full text-foreground">
                {gist.name}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}