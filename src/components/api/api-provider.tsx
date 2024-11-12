"use client"

import getQueryClient from "@/lib/queries/queries"
import { QueryClientProvider } from "@tanstack/react-query"

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
}
