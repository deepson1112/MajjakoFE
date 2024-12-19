import { Button } from "@/components/ui/Button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, RefObject, SetStateAction } from "react";

interface PaginationControllerProps {
  count: number;
  next: string;
  previous: null | string;
  total_pages: number;
  // results: Array<{
  //   order_id: number;
  //   order_number: string;
  //   ordered_product: [];
  // }>;
}

export function PaginationController({
  order,
  setPage,
  page,
  divRef,
}: {
  order: { total_pages: number };
  setPage: (newValue: string) => void;
  page: number;
  divRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        {Array.from({ length: order.total_pages }).map((_, index) => (
          <PaginationItem key={`pagination-items-${index}`}>
            <Button
              variant={page === index + 1 ? "outline" : "ghost"}
              onClick={() => {
                setPage(`${index + 1}`);
                divRef?.current?.scrollIntoView();
              }}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
