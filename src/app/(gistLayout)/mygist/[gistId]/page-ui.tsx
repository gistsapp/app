import GistDetails from '@/components/ui/gist-details'
import { Gist } from '@/types'

interface MyGistIdPageProps {
  gist: Gist
  onDownloadClick: () => void
  onSaveClick: () => void
}

export default function MyGistIdPage({ gist, onDownloadClick, onSaveClick }: MyGistIdPageProps) {
  return <GistDetails folder={'My Gists'} gist={gist} redirect={true} onDownloadClick={onDownloadClick} onSaveClick={onSaveClick} />
}
