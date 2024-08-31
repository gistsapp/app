import { Team } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../shadcn/accordion";
import { Button } from "../shadcn/button";
import MenuButton from "./menu-button";
import { TeamSection } from "./team-section";

interface TeamListProps {
  teams: Team[];
  onTeamGistClick: () => void;
}

export function TeamList({ teams, onTeamGistClick }: TeamListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {teams.map((team) => (
        <AccordionItem
          key={team.name}
          value={team.name}
          className="border-none"
        >
          <AccordionTrigger>
            <TeamSection title={team.name} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {team.gists.map((gist) => (
              <MenuButton
                key={gist.id}
                variant="menu"
                size="menu"
                onClick={onTeamGistClick}
                href={"/team/" + team.id + "/gist/" + gist.id}
                className="w-full"
              >
                {gist.name}
              </MenuButton>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
