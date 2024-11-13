"use client"
import React from "react"
import MyGistIdPage from "./page-ui"
import { useGist, usePatchGistContent, usePatchGistName } from "@/lib/queries/gists.queries"
import { useToast } from "@/components/shadcn/use-toast"
import { getRawGistURL } from "@/lib/utils"

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

  const onCopy = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log("Copy")
        toast({
          title: "Gist Copied",
          description: "Your gist has been copied successfully",
        })
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error)
      })
  }

  const onCopyCurl = () => {
    const curlCommand = `curl ${getRawGistURL(gistId)} -o- | /bin/bash`
    toast({
      title: "Gist Copied",
      description: "Your curl command has been copied successfully",
    })
    navigator.clipboard.writeText(curlCommand)
  }

  if (!data) {
    return null
  }
  return (
    <MyGistIdPage
      gist={data}
      onDownload={onDownload}
      onSave={onSave}
      onDelete={onDelete}
      onShare={onShare}
      onCopy={onCopy}
      onCopyCurl={onCopyCurl}
    />
  )
}
