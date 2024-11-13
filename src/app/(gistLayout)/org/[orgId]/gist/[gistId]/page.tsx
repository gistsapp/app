"use client"
import { useToast } from "@/components/shadcn/use-toast"
import GistDetails from "@/components/ui/gist-details"
import { useEditGist, useGist, usePatchGistContent, usePatchGistName } from "@/lib/queries/gists.queries"
import { useOrg } from "@/lib/queries/orgs.queries"
import { getRawGistURL } from "@/lib/utils"
import React from "react"

interface MyOrgGistIdFeaturePageProps {
  params: {
    orgId: string
    gistId: string
  }
}

export default function MyOrgGistIdFeaturePage({ params }: MyOrgGistIdFeaturePageProps) {
  const { orgId, gistId } = params
  const { data: orgData } = useOrg(orgId)
  const { data: gistData } = useGist(gistId)
  const { toast } = useToast()
  const { mutate: updateName } = usePatchGistName({
    onSuccess: () => {
      toast({
        title: "Gist Saved",
        description: "Your gist has been saved successfully a ",
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
    updateContent({ id: gistId, content: code })
    updateName({ id: gistId, name })
    toast({
      title: "Gist Saved",
      description: "Your gist has been saved successfully",
    })
  }

  const onShare = () => {
    console.log("Share")
    toast({
      title: "Gist Shared",
      description: "Your gist has been shared successfully",
    })
  }

  const onDelete = (id: string) => {
    toast({
      title: "Gist Deleted",
      description: "Your gist has been deleted successfully",
    })
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

  if (!gistData) {
    return null
  }

  return (
    <GistDetails
      orgName={orgData ? orgData.name : "My Gists"}
      gist={gistData}
      onDownload={onDownload}
      onSave={onSave}
      onShare={onShare}
      onDelete={onDelete}
      onCopy={onCopy}
      onCopyCurl={onCopyCurl}
    />
  )
}
