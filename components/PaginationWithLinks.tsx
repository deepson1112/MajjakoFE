"use client";

import { type ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  setPage: (newValue: string) => void;
}

/**
 * Navigate with Nextjs links (need to update your own `pagination.tsx` to use Nextjs Link)
 * 
 * @example
 * ```
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalCount={500}
  />
 * ```
 */
export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  setPage,
}: PaginationWithLinksProps) {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = (newPage: number) => {
    setPage(`${newPage}`);
  };

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <Button
              onClick={() => buildLink(i)}
              className={cn(
                page === i ? "" : "bg-white text-gray-500 hover:bg-gray-200"
              )}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <Button
            onClick={() => buildLink(1)}
            className={cn(
              page === 1 ? "" : "bg-white text-gray-500 hover:bg-gray-200"
            )}
          >
            1
          </Button>
        </PaginationItem>
      );

      if (page > 3) {
        //Increase the legnth for ellispe to show
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + (page == 1 ? 2 : 1)); //Increase the visible numbers from first

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <Button
              onClick={() => buildLink(i)}
              className={cn(
                page === i ? "" : "bg-white text-gray-500 hover:bg-gray-200"
              )}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <Button
            onClick={() => buildLink(totalPageCount)}
            className={cn(
              page === totalPageCount
                ? ""
                : "bg-white text-gray-500 hover:bg-gray-200"
            )}
          >
            {totalPageCount}
          </Button>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={
                page === 1
                  ? "pointer-events-none opacity-50 cursor-pointer"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={
                page === totalPageCount
                  ? "pointer-events-none opacity-50 cursor-pointer"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
