"use client";
import { createContext, ReactNode, useState } from "react";

interface PaginationContextContent {
  offset: number;
  limit: number;
  nb_pages?: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setNbPages: (nb_pages: number) => void;
}

const PaginationInitialState = {
  offset: 0,
  limit: 9,
  nb_pages: 0,
  setOffset: (offset: number) => {},
  setLimit: (limit: number) => {},
  setNbPages: (nb_pages: number) => {},
};

export const PaginationContext = createContext<PaginationContextContent>(
  PaginationInitialState,
);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [offset, setOffset] = useState(PaginationInitialState.offset);
  const [limit, setLimit] = useState(PaginationInitialState.limit);
  const [nb_pages, setNbPages] = useState(PaginationInitialState.nb_pages);

  const setOffsetHandler = (offset: number) => {
    if (offset >= 0 && offset <= nb_pages * limit) {
      setOffset(offset);
    }
  };

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
  );
}
