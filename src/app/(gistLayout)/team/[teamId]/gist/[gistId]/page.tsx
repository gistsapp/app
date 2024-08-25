"use client";
import GistDetails from "@/components/ui/gist-details";
import { useGist } from "@/lib/queries/gists.queries";
import React from "react";

interface MyTeamGistIdFeaturePageProps {
  params: {
    teamId: string;
    gistId: string;
  };
}

// TODO: Get the teams and gist from the params id and pass it to the GistDetails component

const gistMock = {
  id: "1",
  name: "My first Gist",
  code: 'console.log("Hello, World!")',
};

const folderMock = "Team A";

export default function MyTeamGistIdFeaturePage({
  params,
}: MyTeamGistIdFeaturePageProps) {
  const { teamId, gistId } = params;
  const { data } = useGist(gistId);

  if (!data) {
    return null;
  }

  return <GistDetails folder={folderMock} gist={data} />;
}
