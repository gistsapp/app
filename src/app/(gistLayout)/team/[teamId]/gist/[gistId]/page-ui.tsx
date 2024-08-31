import GistDetails from "@/components/ui/gist-details";
import { Gist } from "@/types";

interface MyTeamGistIdPageProps {
  gist: Gist;
  folder: string;
}

export default function MyTeamGistIdPage({
  folder,
  gist,
}: MyTeamGistIdPageProps) {
  return <GistDetails folder={folder} gist={gist} />;
}
