"use client"

import { useContext, useEffect } from "react"
import MyGistList from "../ui/mygist-list"
import { useDeleteGist, useGists } from "@/lib/queries/gists.queries"
import { PaginationContext } from "../contexts/pagination"
import { useMe } from "@/lib/queries/user.queries"
import { toast } from "../shadcn/use-toast"

export function MyGistListFeature() {
  const { data: user } = useMe()
  const { offset, limit, setNbPages } = useContext(PaginationContext)
  const { data, nb_pages } = useGists({
    limit,
    offset,
  })

  useEffect(() => {
    setNbPages(nb_pages || 0)
  }, [nb_pages, setNbPages])

  const { mutate: deleteGist } = useDeleteGist({
    onSuccess: () => {
      toast({
        title: "Gist Deleted",
        description: "Your gist has been deleted successfully",
      })
    },
  })

  const handleDeleteGist = (id: string) => {
    deleteGist(id)
  }

  return <MyGistList gists={data || []} username={user?.name} onDeleteGist={handleDeleteGist} />
}
