"use client";

import { ReactNode, useCallback } from "react";
import GistLayout from "./layout-ui";
import { useMe } from "@/lib/queries/user.queries";
import { useToast } from "@/components/shadcn/use-toast";
import { useCreateGist } from "@/lib/queries/gists.queries";
import { useCreateOrg } from "@/lib/queries/orgs.queries";

export default function GistLayoutFeature({
  children,
}: {
  children: ReactNode;
}) {
  const { data, error } = useMe();
  const { toast } = useToast();
  const { mutate: createGist } = useCreateGist({
    onSuccess: () => {
      toast({
        title: "Gist Created",
        description: "Your gist has been created successfully",
      });
    },
  });

  const { mutate: createOrg } = useCreateOrg({
    onSuccess: () => {
      toast({
        title: "Org Created",
        description: "Your org has been created successfully",
      });
    },
  });

  const onMyGists = () => {};

  const onCreateOrg = useCallback(
    (name: string) => {
      createOrg(name);
    },
    [toast, createOrg],
  );

  const onLogout = () => {};

  const onCreateGist = (name: string, content: string) => {
    createGist({
      content,
      name,
    });
  };

  return (
    <GistLayout
      onLogout={onLogout}
      username={data?.name ?? ""}
      avatar={data?.picture ?? ""}
      onCreateOrg={onCreateOrg}
      onMyGists={onMyGists}
      onCreateGist={onCreateGist}
    >
      {children}
    </GistLayout>
  );
}
