"use client";
import MyGistList from "../ui/mygist-list";
import { useDeleteGist, useGists } from "@/lib/queries/gists.queries";

export function MyGistListFeature() {
  const { data } = useGists();
  const { mutate: deleteGist } = useDeleteGist({
    onSuccess: (id) => {
      console.log(`Deleting gist with ID: ${id}`);
    },
  });
  const handleDeleteGist = (id: string) => {
    deleteGist(id);
  };

  return <MyGistList gists={data || []} onDeleteGist={handleDeleteGist} />;
}
