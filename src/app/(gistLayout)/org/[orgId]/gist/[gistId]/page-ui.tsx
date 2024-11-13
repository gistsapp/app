import GistDetails from "@/components/ui/gist-details"
import { Gist } from "@/types"

interface MyOrgGistIdPageProps {
  gist: Gist
  orgName: string
  onDownload: () => void
  onSave: () => void
  onDelete: (id: string) => void
  onShare: () => void
  onCopy: (code: string) => void
  onCopyCurl: () => void
}

export default function MyOrgGistIdPage({
  orgName,
  gist,
  onDownload,
  onSave,
  onDelete,
  onCopy,
  onCopyCurl,
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
      onCopy={onCopy}
      onCopyCurl={onCopyCurl}
    />
  )
}
