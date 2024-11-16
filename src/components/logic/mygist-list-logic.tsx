"use client"

import { useContext, useEffect } from "react"
import MyGistList from "../ui/mygist-list"
import { useDeleteGist, useGists } from "@/lib/queries/gists.queries"
import { PaginationContext } from "../contexts/pagination"
import { useMe } from "@/lib/queries/user.queries"

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
    onSuccess: (id) => {
      console.log(`Deleting gist with ID: ${id}`)
    },
  })

  const handleDeleteGist = (id: string) => {
    deleteGist(id)
  }

  return <MyGistList gists={data || []} username={user?.name} onDeleteGist={handleDeleteGist} />
}
