"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createContext, ReactNode, useCallback, useEffect, useState } from "react"

interface PaginationContextContent {
  offset: number
  limit: number
  nb_pages?: number
  setOffset: (offset: number) => void
  setLimit: (limit: number) => void
  setNbPages: (nb_pages: number) => void
}

const PaginationInitialState = {
  offset: 0,
  limit: 9,
  nb_pages: 0,
  setOffset: (offset: number) => {},
  setLimit: (limit: number) => {},
  setNbPages: (nb_pages: number) => {},
}

export const PaginationContext = createContext<PaginationContextContent>(PaginationInitialState)

export function PaginationProvider({ children, fromUrl }: { children: ReactNode; fromUrl: boolean }) {
  const [offset, setOffset] = useState(PaginationInitialState.offset)
  const [limit, setLimit] = useState(PaginationInitialState.limit)
  const [nb_pages, setNbPages] = useState(PaginationInitialState.nb_pages)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const checkOffset = useCallback(
    (offset: number) => {
      if (offset >= 0 && offset <= nb_pages * limit) {
        return true
      }
      return false
    },
    [nb_pages, limit]
  )

  const setOffsetHandler = useCallback(
    (offset: number) => {
      if (checkOffset(offset)) {
        if (fromUrl) {
          const page = Math.floor(offset / limit) + 1
          router.push(`${pathname}?page=${page}`)
        }
        setOffset(offset)
      }
    },
    [checkOffset, fromUrl, limit, pathname, router]
  )

  useEffect(() => {
    if (!fromUrl) return
    if (searchParams.has("page")) {
      const page = parseInt(searchParams.get("page") as string)
      const offset = (page - 1) * limit
      if (!checkOffset(offset)) return
      setOffset(offset)
    }
  }, [searchParams, fromUrl, setOffset, limit, setOffsetHandler, checkOffset])

  return (
    <PaginationContext.Provider
      value={{
        offset,
        setOffset: setOffsetHandler,
        limit,
        setLimit,
        nb_pages,
        setNbPages,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
