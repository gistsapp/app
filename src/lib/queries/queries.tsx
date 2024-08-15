"use client";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = () => {
  return new QueryClient();
};
export default getQueryClient;
