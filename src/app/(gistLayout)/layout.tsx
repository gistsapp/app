"use client";

import { ReactNode, useCallback } from "react";
import GistLayout from "./layout-ui";
import { useMe } from "@/lib/queries/user.queries";
import { toast, useToast } from "@/components/shadcn/use-toast";
import { useCreateGist } from "@/lib/queries/gists.queries";

export default function GistLayoutFeature({
  children,
}: {
  children: ReactNode;
}) {
  const { data } = useMe();
  const { toast } = useToast();
  const { mutate: createGist } = useCreateGist({
    onSuccess: () => {
      toast({
        title: "Gist Created",
        description: "Your gist has been created successfully",
      });
    },
  });

  const onMyGistsClick = () => {
    console.log("My Gists clicked");
  };

  const onCreateTeamClick = useCallback(
    (name: string) => {
      console.log("Creating tea with name:", name);
      toast({
        title: "Team Created",
        description: "Your team has been created successfully",
      });
    },
    [toast],
  );

  const onCreateGistClick = (name: string, content: string) => {
    console.log(`Creating gist with name: ${name} \nand content: ${content}`);
    createGist({
      content,
      name,
    });
  };

  return (
    <GistLayout
      username={data?.name ?? ""}
      avatar={data?.picture ?? ""}
      onCreateTeamClick={onCreateTeamClick}
      onMyGistsClick={onMyGistsClick}
      onCreateGistClick={onCreateGistClick}
    >
      {children}
    </GistLayout>
  );
}
