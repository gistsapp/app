import { Org } from '@/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../shadcn/accordion'
import { OrgSection } from './org-section'
import { OrgGistSection } from './org-gist-section'

interface OrgListProps {
  orgs: Org[]
  onGistOrg: () => void
  onDeleteOrg: (id: string) => void
  onDeleteGist: (id: string) => void
  onUpdateOrg: (id: string, name: string) => void
}

export function OrgList({ orgs, onGistOrg, onDeleteOrg, onDeleteGist, onUpdateOrg }: OrgListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {orgs.map((org) => (
        <AccordionItem key={org.name} value={org.name} className="border-none">
          <AccordionTrigger>
            <OrgSection title={org.name} onDeleteTeam={() => onDeleteOrg(org.id)} onUpdateTeamClick={() => onUpdateOrg(org.id, org.name)} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {org.gists.map((gist) => (
              <OrgGistSection key={gist.id} gist={gist} org={org} onGistClick={onGistOrg} onDeleteGist={() => onDeleteGist(gist.id)} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
