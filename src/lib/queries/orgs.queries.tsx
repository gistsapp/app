import ky from "ky";
import { getBackendURL } from "../utils";
import { Team } from "@/types";
import { ApiGist } from "./gists.queries";
import { useQuery } from "@tanstack/react-query";

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

export const useOrgs = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["orgs"],
    queryFn: fetchOrgs,
  });
  return { data, error, isPending };
};
