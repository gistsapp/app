"use client"
import React from "react"
import MyGistIdPage from "./page-ui"
import { useGist, usePatchGistContent, usePatchGistName } from "@/lib/queries/gists.queries"
import { useToast } from "@/components/shadcn/use-toast"
import { useKeyPress } from "@/lib/hook/use-key-press"

interface MyGistIdFeaturePageProps {
  params: {
    gistId: string
  }
}

export default function MyGistIdFeaturePage({ params }: MyGistIdFeaturePageProps) {
  const { gistId } = params
  const { data } = useGist(gistId)
  const { toast } = useToast()

  const { mutate: updateName } = usePatchGistName({
    onSuccess: () => {
      toast({
        title: "Gist Saved",
        description: "Your gist has been saved successfully",
      })
    },
  })

  const { mutate: updateContent } = usePatchGistContent({
    onSuccess: () => {},
  })

  const onDownload = () => {
    toast({
      title: "Gist Downloaded",
      description: "Your gist has been downloaded successfully",
    })
  }
  const onSave = (name: string, code: string) => {
    updateContent({ id: gistId, content: code })
    updateName({ id: gistId, name })
    toast({
      title: "Gist Saved",
      description: "Your gist has been saved successfully",
    })
  }

  const onDelete = (id: string) => {
    console.log(`Deleting gist with ID: ${id}`)
  }

  const onShare = () => {
    console.log("Share")
  }

  if (!data) {
    return null
  }
  return <MyGistIdPage gist={data} onDownload={onDownload} onSave={onSave} onDelete={onDelete} onShare={onShare} />
}
