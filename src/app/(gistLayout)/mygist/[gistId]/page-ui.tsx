import GistDetails from "@/components/ui/gist-details";
import { Gist } from "@/types";

interface MyGistIdPageProps {
  gist: Gist;
}

export default function MyGistIdPage({ gist }: MyGistIdPageProps) {
  return <GistDetails folder={"My Gists"} gist={gist} redirect={true} />;
}
