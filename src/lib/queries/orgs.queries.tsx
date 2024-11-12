import ky from "ky"
import { getBackendURL } from "../utils"
import { Org } from "@/types"
import { ApiGist } from "./gists.queries"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

interface AllApiOrg {
  id: string
  name: string
}

interface ApiOrg {
  id: string
  name: string
  gists: string[]
}

const fetchOrgs = async () => {
  let orgs: Org[] = []
  const json = await ky
    .get(`${getBackendURL()}/orgs`, {
      credentials: "include",
      retry: 0,
    })
    .json<AllApiOrg[]>()

  if (!json) {
    return []
  }

  for (let org of json) {
    let data: Org = {
      id: org.id,
      name: org.name,
      gists: [],
    }
    try {
      const orgDetail = await ky
        .get(`${getBackendURL()}/orgs/${org.id}`, {
          credentials: "include",
          retry: 0,
        })
        .json<ApiOrg>()
      for (let gistId of orgDetail.gists) {
        const gist = await ky
          .get(`${getBackendURL()}/gists/${gistId}`, {
            credentials: "include",
          })
          .json<ApiGist>()
        data.gists.push({
          id: gist.id,
          name: gist.name,
          code: gist.content,
        })
      }
    } catch (e) {
      // orgs can be empty therefore we need to catch the error and ignore it
    }
    orgs.push(data)
  }

  return orgs
}

const fetchOrg = async (orgId: string): Promise<Org> => {
  const json = await ky
    .get(`${getBackendURL()}/orgs/${orgId}`, {
      credentials: "include",
      retry: 0,
    })
    .json<ApiOrg>()
  return {
    id: json.id,
    name: json.name,
    gists: json.gists.map((gistId) => {
      return {
        id: gistId,
        name: "",
        code: "",
      }
    }),
  }
}

const fetchCreateOrg = async (name: string): Promise<Org> => {
  const json = await ky
    .post(`${getBackendURL()}/orgs`, {
      credentials: "include",
      json: { name },
      retry: 0,
    })
    .json<ApiOrg>()
  return {
    id: json.id,
    name: json.name,
    gists: [],
  }
}

const fetchDeleteOrg = async (id: string) => {
  await ky
    .delete(`${getBackendURL()}/orgs/${id}`, {
      credentials: "include",
      retry: 0,
    })
    .json()
}

//hooks

export const useOrgs = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["orgs"],
    queryFn: fetchOrgs,
  })
  return { data, error, isPending }
}

export const useOrg = (orgId: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["orgs", orgId],
    queryFn: () => fetchOrg(orgId),
  })
  return { data, error, isPending }
}

export const useCreateOrg = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient()

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (name: string) => fetchCreateOrg(name),
    onSuccess: (newOrg) => {
      queryClient.setQueryData(["orgs"], (orgs: Org[] | undefined) => {
        return orgs ? [...orgs, newOrg] : [newOrg]
      })

      if (onSuccess) {
        onSuccess()
      }
    },
  })

  return { mutate, error, data, isPending }
}

export const useDeleteOrgs = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient()
  const [orgID, setOrgID] = useState<string>("")

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (id: string) => {
      setOrgID(id)
      return fetchDeleteOrg(id)
    },
    onSuccess: () => {
      queryClient.setQueryData(["orgs"], (orgs: Org[] | undefined) => {
        return orgs?.filter((org) => org.id !== orgID)
      })
      if (onSuccess) {
        onSuccess()
      }
    },
  })

  return { mutate, error, data, isPending }
}
