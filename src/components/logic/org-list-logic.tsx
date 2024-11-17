import { useDeleteGist } from "@/lib/queries/gists.queries"
import { OrgList } from "../ui/org-list"
import { useDeleteOrgs, useOrgs } from "@/lib/queries/orgs.queries"
import { toast } from "../shadcn/use-toast"

export function OrgListFeature() {
  const { data } = useOrgs()
  const { mutate: deleteOrg } = useDeleteOrgs({
    onSuccess: () => {
      toast({
        title: "Orgnization Deleted",
        description: "Your organization has been deleted successfully",
      })
    },
  })

  const handleDeleteOrg = (id: string) => {
    deleteOrg(id)
  }

  const onGistOrg = () => {
    console.log("Gist Org Clicked")
  }

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

  const onUpdateOrg = (id: string, name: string) => {
    console.log(`Updating org with ID: ${id} and name: ${name}`)
  }

  return (
    <OrgList
      orgs={data || []}
      onGistOrg={onGistOrg}
      onDeleteOrg={handleDeleteOrg}
      onDeleteGist={handleDeleteGist}
      onUpdateOrg={onUpdateOrg}
    />
  )
}
