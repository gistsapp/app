import ky from "ky";
import { getBackendURL } from "../utils";
import { useQuery } from "@tanstack/react-query";

interface ApiUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

const fetchMe = async () => {
  const json = await ky
    .get(`${getBackendURL()}/user/me`, {
      credentials: "include",
    })
    .json<ApiUser>();

  return json;
};

export const useMe = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
  return { data, error, isPending };
};
