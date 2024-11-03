"use client";

import { ReactNode, useCallback } from "react";
import GistLayout from "./layout-ui";
import { useMe } from "@/lib/queries/user.queries";
import { useToast } from "@/components/shadcn/use-toast";
import { useCreateGist } from "@/lib/queries/gists.queries";
import { useCreateOrg } from "@/lib/queries/orgs.queries";
import { useLogout } from "@/lib/queries/auth.queries";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

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
        title: "Organization Created",
        description: "Your org has been created successfully",
      });
    },
  });

  const { mutate: logout } = useLogout({
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      window.location.href = "/"; //sorry but couldn't find a way to redirect to the login page
    },
  });

  const onMyGists = () => {};

  const onCreateOrg = useCallback(
    (name: string) => {
      createOrg(name);
    },
    [createOrg],
  );

  const onLogout = () => {
    logout();
  };

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
