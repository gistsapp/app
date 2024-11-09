import GistDetails from "@/components/ui/gist-details"
import { Gist } from "@/types"

interface MyOrgGistIdPageProps {
  gist: Gist
  orgName: string
  onDownload: () => void
  onSave: () => void
  onDelete: (id: string) => void
  onShare: () => void
}

export default function MyOrgGistIdPage({
  orgName,
  gist,
  onDownload,
  onSave,
  onDelete,
  onShare,
}: MyOrgGistIdPageProps) {
  return (
    <GistDetails
      orgName={orgName}
      gist={gist}
      onDownload={onDownload}
      onSave={onSave}
      onDelete={onDelete}
      onShare={onShare}
    />
  )
}
