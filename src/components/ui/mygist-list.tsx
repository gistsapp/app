import { Gist } from "@/types"
import Card from "./card"

interface MyGistListProps {
  gists: Gist[]
  onDeleteGist: (id: string) => void
}

export default function MyGistList({ gists, onDeleteGist }: MyGistListProps) {
  if (gists.length === 0) {
    return (
      <div className="p-4 h-full flex items-center justify-center border-border border-r border-l">
        <p className="text-lg text-gray-500">You don&apos;t have personal Gists yet.</p>
      </div>
    )
  }

  return (
    <div className="p-4 h-full grid grid-cols-3 grid-rows-3 gap-4 border-border border-r border-l">
      {gists.map((gist) => (
        <Card key={gist.id} gist={gist} href={`/mygist/${gist.id}`} onDeleteGist={() => onDeleteGist(gist.id)} />
      ))}
    </div>
  )
}
