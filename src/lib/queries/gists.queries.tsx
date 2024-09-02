"use client";
import ky from "ky";
import { getBackendURL } from "../utils";
import { Gist } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export interface CreateGistPayload {
  name: string;
  content: string;
  org_id?: string;
}

const fetchCreateGist = async (gist: CreateGistPayload): Promise<Gist> => {
  const json = await ky
    .post(`${getBackendURL()}/gists`, {
      credentials: "include",
      json: gist,
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

export const useCreateGist = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient(); // Access the Query Client

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (gist: CreateGistPayload) => {
      return fetchCreateGist(gist);
    },
    onSuccess: (newGist) => {
      queryClient.setQueryData(["gists"], (oldData: any) => {
        // Assuming oldData is an array, you might need to adjust this based on your actual data structure
        return [...(oldData || []), newGist];
      });

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
  });
  return { mutate, error, data, isPending };
};
