"use client";
import React from "react";
import MyGistIdPage from "./page-ui";
import {
  useGist,
  usePatchGistContent,
  usePatchGistName,
} from "@/lib/queries/gists.queries";
import { useToast } from "@/components/shadcn/use-toast";

interface MyGistIdFeaturePageProps {
  params: {
    gistId: string;
  };
}

export default function MyGistIdFeaturePage({
  params,
}: MyGistIdFeaturePageProps) {
  const { gistId } = params;
  const { data } = useGist(gistId);
  const { toast } = useToast();

  const { mutate: updateName } = usePatchGistName({
    onSuccess: () => {
      toast({
        title: "Gist Saved",
        description: "Your gist has been saved successfully",
      });
    },
  });

  const { mutate: updateContent } = usePatchGistContent({
    onSuccess: () => {
    },
  });

  const onDownloadClick = () => {
    toast({
      title: "Gist Downloaded",
      description: "Your gist has been downloaded successfully",
    });
  };
  const onSaveClick = (name: string, code: string) => {
    updateContent({ id: gistId, content: code });

    updateName({ id: gistId, name });
  };
  if (!data) {
    return null;
  }
  return (
    <MyGistIdPage
      gist={data}
      onDownloadClick={onDownloadClick}
      onSaveClick={onSaveClick}
    />
  );
}
