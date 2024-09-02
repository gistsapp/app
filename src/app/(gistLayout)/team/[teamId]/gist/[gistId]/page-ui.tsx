import GistDetails from '@/components/ui/gist-details'
import { Gist } from '@/types'

interface MyTeamGistIdPageProps {
  gist: Gist
  folder: string
  onDownloadClick: () => void
  onSaveClick: () => void
}

export default function MyTeamGistIdPage({ folder, gist, onDownloadClick, onSaveClick }: MyTeamGistIdPageProps) {
  return <GistDetails folder={folder} gist={gist} onDownloadClick={onDownloadClick} onSaveClick={onSaveClick} />
}
