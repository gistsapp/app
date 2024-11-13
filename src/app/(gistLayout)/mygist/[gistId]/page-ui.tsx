import GistDetails from "@/components/ui/gist-details"
import { Gist } from "@/types"

interface MyGistIdPageProps {
  gist: Gist
  onDownload: () => void
  onSave: (name: string, code: string) => void
  onDelete: (id: string) => void
  onShare: () => void
  onCopy: (code: string) => void
  onCopyCurl: () => void
}

export default function MyGistIdPage({
  gist,
  onDownload,
  onSave,
  onDelete,
  onShare,
  onCopy,
  onCopyCurl,
}: MyGistIdPageProps) {
  return (
    <GistDetails
      orgName={"My Gists"}
      gist={gist}
      redirect={true}
      onDownload={onDownload}
      onSave={onSave}
      onDelete={onDelete}
      onShare={onShare}
      onCopy={onCopy}
      onCopyCurl={onCopyCurl}
    />
  )
}
