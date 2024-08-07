import Card from './card'

interface MyGistListProps {
  gists: Gist[]
}

export default function MyGistList({ gists }: MyGistListProps) {
  if (gists.length === 0) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <p className="text-lg text-gray-500">You don't have personal Gists yet.</p>
      </div>
    )
  }

  return (
    <div className="p-4 h-full grid grid-cols-3 grid-rows-3 gap-4">
      {gists.map((gist) => (
        <Card key={gist.id} title={gist.name} href={`/mygist/${gist.id}`} />
      ))}
    </div>
  )
}
