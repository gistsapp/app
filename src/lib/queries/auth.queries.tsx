"use client";
import ky from "ky";
import { getBackendURL } from "../utils";
import { useMutation } from "@tanstack/react-query";
import getQueryClient from "./queries";

const fetchLocalAuth = async ({ email }: { email: string }) => {
  const json = await ky
    .post(`${getBackendURL()}/auth/local/begin`, {
      json: { email },
    })
    .json();

  return json; //no need to assert type since the most important is the status code
};

const fetchLocalAuthVerify = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const json = await ky
    .post(`${getBackendURL()}/auth/local/verify`, {
      json: { email, token },
      credentials: "include",
    })
    .json();
  return json;
};

/**
 * Start the local authentication process by sending an email to the user
 * @param email, the user email
 * @returns the mutation object, and error if any and a boolean indicating the loading state
 */
export const useLocalAuth = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: (email: string) => {
      return fetchLocalAuth({ email });
    },
  });
  return { mutate, error, isPending };
};

export const useLocalAuthVerify = () => {
  const { mutate, error, isPending, data } = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) => {
      return fetchLocalAuthVerify({ email, token });
    },
  });
  return { mutate, error, isPending, data };
};
