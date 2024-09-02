import ky from "ky";
import { getBackendURL } from "../utils";
import { Team } from "@/types";
import { ApiGist } from "./gists.queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface AllApiOrg {
  id: string;
  name: string;
}

interface ApiOrg {
  id: string;
  name: string;
  gists: string[];
}

const fetchOrgs = async () => {
  let orgs: Team[] = [];
  const json = await ky
    .get(`${getBackendURL()}/orgs`, {
      credentials: "include",
    })
    .json<AllApiOrg[]>();

  for (let org of json) {
    let team: Team = {
      id: org.id,
      name: org.name,
      gists: [],
    };
    try {
      const orgDetail = await ky
        .get(`${getBackendURL()}/orgs/${org.id}`, {
          credentials: "include",
          retry: 1,
        })
        .json<ApiOrg>();
      for (let gistId of orgDetail.gists) {
        const gist = await ky
          .get(`${getBackendURL()}/gists/${gistId}`, {
            credentials: "include",
          })
          .json<ApiGist>();
        team.gists.push({
          id: gist.id,
          name: gist.name,
          code: gist.content,
        });
      }
    } catch (e) {
      // orgs can be empty therefore we need to catch the error and ignore it
    }
    orgs.push(team);
  }

  return orgs;
};

const fetchCreateOrg = async (name: string): Promise<Team> => {
  const json = await ky
    .post(`${getBackendURL()}/orgs`, {
      credentials: "include",
      json: { name },
    })
    .json<ApiOrg>();
  return {
    id: json.id,
    name: json.name,
    gists: [],
  };
};

const fetchDeleteOrg = async (id: string) => {
  await ky
    .delete(`${getBackendURL()}/orgs/${id}`, {
      credentials: "include",
    })
    .json();
};

//hooks

export const useOrgs = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["orgs"],
    queryFn: fetchOrgs,
  });
  return { data, error, isPending };
};

export const useCreateOrg = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (name: string) => fetchCreateOrg(name),
    onSuccess: (newTeam) => {
      queryClient.setQueryData(["orgs"], (orgs: Team[] | undefined) => {
        return orgs ? [...orgs, newTeam] : [newTeam];
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return { mutate, error, data, isPending };
};

export const useDeleteOrgs = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const [teamID, setTeamID] = useState<string>("");

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (id: string) => {
      setTeamID(id);
      return fetchDeleteOrg(id);
    },
    onSuccess: () => {
      queryClient.setQueryData(["orgs"], (orgs: Team[] | undefined) => {
        return orgs?.filter((org) => org.id !== teamID);
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return { mutate, error, data, isPending };
};
