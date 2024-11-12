import { OrgList } from "../ui/org-list"
import { useDeleteOrgs, useOrgs } from "@/lib/queries/orgs.queries"

export function OrgListFeature() {
  const { data } = useOrgs()
  const { mutate } = useDeleteOrgs({ onSuccess: () => console.log("Deleted") })

  const onDeleteTeam = (id: string) => {
    mutate(id)
  }

  const onGistOrg = () => {
    console.log("Gist Org Clicked")
  }

  const onDeleteGist = (id: string) => {
    console.log(`Deleting gist with ID: ${id}`)
  }

  const onUpdateOrg = (id: string, name: string) => {
    console.log(`Updating org with ID: ${id} and name: ${name}`)
  }

  return (
    <OrgList
      orgs={data || []}
      onGistOrg={onGistOrg}
      onDeleteOrg={onDeleteTeam}
      onDeleteGist={onDeleteGist}
      onUpdateOrg={onUpdateOrg}
    />
  )
}
