"use client"
import React from "react"
import MyGistIdPage from "./page-ui"
import { useDeleteGist, useEditGist, useGist, usePatchGistContent, usePatchGistName } from "@/lib/queries/gists.queries"
import { useToast } from "@/components/shadcn/use-toast"
import { getRawGistURL } from "@/lib/utils"
import { useMe } from "@/lib/queries/user.queries"
import { redirect, useRouter } from "next/navigation"

interface MyGistIdFeaturePageProps {
  params: {
    gistId: string
  }
}

export default function MyGistIdFeaturePage({ params }: MyGistIdFeaturePageProps) {
  const { gistId } = params
  const { data } = useGist(gistId)
  const router = useRouter()
  const { toast } = useToast()
  const { data: user } = useMe()

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

  const { mutate: edit } = useEditGist({
    onSuccess: () => {
      toast({
        title: "Gist Saved",
        description: "Your gist has been saved successfully",
      })
    },
  })
  const onDownload = () => {
    toast({
      title: "Gist Downloaded",
      description: "Your gist has been downloaded successfully",
    })
  }
  const onSave = (name: string, code: string) => {
    edit({
      id: gistId,
      name,
      content: code,
      description: "",
      visibility: "public",
      org_id: null,
      language: "plaintext",
      owner_id: user?.id || "",
    })
  }

  const { mutate: deleteGist } = useDeleteGist({
    onSuccess: () => {
      toast({
        title: "Gist Deleted",
        description: "Your gist has been deleted successfully",
      })
      router.push(`/${user?.name}`)
    },
  })

  const handleDeleteGist = (id: string) => {
    deleteGist(id)
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
      username={user?.name}
      gist={data}
      onDownload={onDownload}
      onSave={onSave}
      onDelete={handleDeleteGist}
      onShare={onShare}
      onCopy={onCopy}
      onCopyCurl={onCopyCurl}
    />
  )
}
