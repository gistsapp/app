"use client";
import React from "react";
import MyGistIdPage from "./page-ui";
import { useGist } from "@/lib/queries/gists.queries";

interface MyGistIdFeaturePageProps {
  params: {
    gistId: string;
  };
}

// TODO: Get the gist from the params id and pass it to the GistDetails component

const gistMock = {
  id: "1",
  name: "My first Gist",
  code: 'console.log("Hello, World!")',
};

export default function MyGistIdFeaturePage({
  params,
}: MyGistIdFeaturePageProps) {
  const { gistId } = params;
  const { data } = useGist(gistId);
  if (!data) {
    return null;
  }
  return <MyGistIdPage gist={data} />;
}
