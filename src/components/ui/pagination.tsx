"use client";
import { useCallback, useContext } from "react";
import { PaginationContext } from "../contexts/pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../shadcn/pagination";

export function PaginationComponent() {
  const { offset, setOffset, limit, nb_pages } = useContext(PaginationContext);

  const current_page = Math.floor(offset / limit) + 1;

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const handlePrevious = () => {
    setOffset(offset - limit);
  };

  const goToPage = (page: number) => {
    setOffset((page - 1) * limit);
  };

  const previousDisabled = useCallback(() => offset === 0, [offset]);
  const nextDisabled = useCallback(() => {
    if (nb_pages) {
      return offset + limit > nb_pages * limit;
    }
    return false;
  }, [offset, nb_pages, limit]);

  if (!nb_pages) {
    return <></>;
  }

  if (nb_pages === 0) {
    return <></>;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            disabled={previousDisabled()}
          />
        </PaginationItem>
        {current_page > 1 && (
          <PaginationItem onClick={() => goToPage(1)}>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        )}
        {nb_pages && nb_pages > 0 && (
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {current_page}
            </PaginationLink>
          </PaginationItem>
        )}
        {current_page <= nb_pages && (
          <PaginationItem onClick={() => goToPage(nb_pages + 1)}>
            <PaginationLink href="#">{nb_pages + 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            disabled={nextDisabled()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export { Pagination };
