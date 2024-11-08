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
        {nb_pages && nb_pages > 0 && (
          <PaginationItem>
            <PaginationLink href="#">{current_page}</PaginationLink>
          </PaginationItem>
        )}
        {/* <PaginationItem> */}
        {/*   <PaginationLink href="#" isActive> */}
        {/*     2 */}
        {/*   </PaginationLink> */}
        {/* </PaginationItem> */}
        {/* <PaginationItem> */}
        {/*   <PaginationLink href="#">3</PaginationLink> */}
        {/* </PaginationItem> */}
        {/* <PaginationItem> */}
        {/*   <PaginationEllipsis /> */}
        {/* </PaginationItem> */}
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
