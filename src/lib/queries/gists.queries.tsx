"use client";
import ky from "ky";
import { getBackendURL } from "../utils";
import { Gist } from "@/types";
import { useQuery } from "@tanstack/react-query";

//types

export interface ApiGist {
  id: string;
  name: string;
  content: string;
  owner_id: string;
  org_id: string | null;
}

//fetches
const fetchGists = async () => {
  const json = await ky
    .get(`${getBackendURL()}/gists`, {
      credentials: "include",
    })
    .json<ApiGist[]>();
  return json.map((gist) => {
    return {
      id: gist.id,
      name: gist.name,
      code: gist.content,
    } as Gist;
  });
};

const fetchGist = async (gistId: string): Promise<Gist> => {
  const json = await ky
    .get(`${getBackendURL()}/gists/${gistId}`, {
      credentials: "include",
    })
    .json<ApiGist>();
  return {
    id: json.id,
    name: json.name,
    code: json.content,
  };
};

//hooks

export const useGists = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["gists"],
    queryFn: fetchGists,
  });

  return { data, error, isPending };
};

export const useGist = (gistId: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["gists", gistId],
    queryFn: () => fetchGist(gistId),
  });
  return { data, error, isPending };
};
