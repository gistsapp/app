"use client"
import { toast } from "@/components/shadcn/use-toast"
import { QueryCache, QueryClient } from "@tanstack/react-query"
import { renewToken } from "./auth.queries"

export const getQueryClient = () => {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: async (error, query) => {
        if (error.message.includes("401")) {
          try {
            await renewToken()
            query.fetch() //try to refetch
          } catch {
            // need to logout !!!!
            toast({
              title: "Error",
              description: "Please try to log in again",
            })
          }
        }
      },
    }),
  })
}
export default getQueryClient
