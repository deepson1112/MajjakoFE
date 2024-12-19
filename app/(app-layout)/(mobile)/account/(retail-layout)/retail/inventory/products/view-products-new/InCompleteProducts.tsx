"use client";
import { api } from "@/lib/fetcher";
import React, { RefObject, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DataTable } from "./ViewProductTable/data-table";
import { columns } from "./ViewProductTable/columns";
import { PaginationController } from "@/app/(app-layout)/(mobile)/account/(delivered)/delivered/PaginationController";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import ListLoader from "@/components/loaders/ListLoader";
import { useDebounce } from "@/hooks/useDebounce";
import { NestedProduct } from "@/types";

type Image = {
  default_image: string;
  image: string;
};

type Variation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

const InCompletedProduct = ({
  divRef,
}: {
  divRef?: RefObject<HTMLDivElement | null>;
}) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const [page, setPage] = useQueryParamState<string>("page", "1");
  const [localSearch, setLocalSearch] = useState<string>(searchValue);

  const debouncedSearch = useDebounce(localSearch);

  const [search, setSearch] = useQueryParamState<string>("search", "");

  const {
    data: nestedProducts,
    refetch,
    isRefetching: nestedRefetchProductsLoader,
    isLoading: nestedProductsLoader,
  } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          `/retails/product/?page=${page || 1}&is_complete=false${
            searchValue ? `&search=${searchValue}` : ""
          }`
        )
        .json<{
          results: NestedProduct[];
          count: number;
          next: string;
          previous: null | string;
          total_pages: number;
        }>();
      return response;
    },
    queryKey: ["retail-nested-products-incomplete", page, search],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSearch(localSearch);
  }, [debouncedSearch]);

  return (
    <div>
      <div className="relative py-4">
        <Search className="absolute inset-y-0 w-6 h-6 my-auto left-3" />
        <Input
          className="bg-gray-100 border-none pl-12"
          placeholder={`Filter product...`}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      {nestedProductsLoader || nestedRefetchProductsLoader ? (
        <ListLoader />
      ) : !!nestedProducts ? (
        <div>
          <DataTable data={nestedProducts?.results || []} columns={columns} />
          <PaginationController
            divRef={divRef}
            order={nestedProducts}
            setPage={setPage}
            page={Number(page)}
          />
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default InCompletedProduct;
