'use client'
import ky from 'ky'
import { getBackendURL } from '../utils'
import { Gist } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

//types

export interface ApiGist {
  id: string
  name: string
  content: string
  owner_id: string
  org_id: string | null
}

//fetches
const fetchGists = async () => {
  const json = await ky
    .get(`${getBackendURL()}/gists`, {
      credentials: 'include',
    })
    .json<ApiGist[]>()
  return json.map((gist) => {
    return {
      id: gist.id,
      name: gist.name,
      code: gist.content,
    } as Gist
  })
}

const fetchGist = async (gistId: string): Promise<Gist> => {
  const json = await ky
    .get(`${getBackendURL()}/gists/${gistId}`, {
      credentials: 'include',
    })
    .json<ApiGist>()
  return {
    id: json.id,
    name: json.name,
    code: json.content,
  }
}

export interface CreateGistPayload {
  name: string
  content: string
  org_id?: string
}

const fetchCreateGist = async (gist: CreateGistPayload): Promise<Gist> => {
  const json = await ky
    .post(`${getBackendURL()}/gists`, {
      credentials: 'include',
      json: gist,
    })
    .json<ApiGist>()
  return {
    id: json.id,
    name: json.name,
    code: json.content,
  }
}

export interface PatchGistNamePayload {
  id: string
  name: string
}

const fetchPatchGistName = async (payload: PatchGistNamePayload): Promise<Gist> => {
  const json = await ky
    .patch(`${getBackendURL()}/gists/${payload.id}/name`, {
      credentials: 'include',
      json: { name: payload.name },
    })
    .json<ApiGist>()
  return {
    id: json.id,
    name: json.name,
    code: json.content,
  }
}

export interface PatchGistContentPayload {
  id: string
  content: string
}

const fetchPatchGistContent = async (payload: PatchGistContentPayload): Promise<Gist> => {
  const json = await ky
    .patch(`${getBackendURL()}/gists/${payload.id}/content`, {
      credentials: 'include',
      json: { content: payload.content },
    })
    .json<ApiGist>()

  return {
    id: json.id,
    name: json.name,
    code: json.content,
  }
}

const fetchDeleteGist = async (id: string) => {
  await ky
    .delete(`${getBackendURL()}/gists/${id}`, {
      credentials: 'include',
    })
    .then()
  return id
}

//hooks

export const useGists = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['gists'],
    queryFn: fetchGists,
  })

  return { data, error, isPending }
}

export const useGist = (gistId: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ['gists', gistId],
    queryFn: () => fetchGist(gistId),
  })
  return { data, error, isPending }
}

export const useCreateGist = () => {
  const queryClient = useQueryClient() // Access the Query Client

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (gist: CreateGistPayload) => {
      return fetchCreateGist(gist)
    },
    onSuccess: (newGist) => {
      queryClient.setQueryData(['gists'], (oldData: any) => {
        // Assuming oldData is an array, you might need to adjust this based on your actual data structure
        return [...(oldData || []), newGist]
      })
    },
  })
  return { mutate, error, data, isPending }
}

function updateNewGistInCache(queryClient: any, newGist: Gist) {
  queryClient.setQueryData(['gists'], (oldData: any) => {
    // Assuming oldData is an array, you might need to adjust this based on your actual data structure
    return oldData.map((gist: Gist) => {
      if (gist.id === newGist.id) {
        return newGist
      }
      return gist
    })
  })
}

export const usePatchGistName = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient() // Access the Query Client

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (payload: PatchGistNamePayload) => {
      return fetchPatchGistName(payload)
    },
    onSuccess: (newGist) => {
      updateNewGistInCache(queryClient, newGist) // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    },
  })
  return { mutate, error, data, isPending }
}

export const usePatchGistContent = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient() // Access the Query Client

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (payload: PatchGistContentPayload) => {
      return fetchPatchGistContent(payload)
    },
    onSuccess: (newGist) => {
      updateNewGistInCache(queryClient, newGist) // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    },
  })
  return { mutate, error, data, isPending }
}

export const useDeleteGist = ({ onSuccess }: { onSuccess: (id: string) => void }) => {
  const queryClient = useQueryClient()

  const { mutate, error, data, isPending } = useMutation({
    mutationFn: (id: string) => {
      return fetchDeleteGist(id)
    },
    onSuccess: (gistID) => {
      queryClient.setQueryData(['gists'], (oldData: any) => {
        return oldData.filter((gist: Gist) => gist.id !== gistID.toString())
      })
      onSuccess(gistID.toString())
    },
  })

  return { mutate, error, data, isPending }
}
