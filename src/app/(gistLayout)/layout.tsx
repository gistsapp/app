"use client";

import { ReactNode } from "react";
import GistLayout from "./layout-ui";
import { useMe } from "@/lib/queries/user.queries";

export default function GistLayoutFeature({
  children,
}: {
  children: ReactNode;
}) {
  const { data } = useMe();

  const onMyGistsClick = () => {
    console.log("My Gists clicked");
  };

  const onCreateTeamClick = () => {
    console.log("Create team clicked");
  };

  return (
    <GistLayout
      username={data?.name ?? ""}
      avatar={data?.picture ?? ""}
      onCreateTeamClick={onCreateTeamClick}
      onMyGistsClick={onMyGistsClick}
    >
      {children}
    </GistLayout>
  );
}
