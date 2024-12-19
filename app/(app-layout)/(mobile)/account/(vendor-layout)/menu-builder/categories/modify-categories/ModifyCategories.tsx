"use client";

import ListLoader from "@/components/loaders/ListLoader";
import { api } from "@/lib/fetcher";
import {
  Category,
  DepartmentType,
  departmentSchema,
} from "@/lib/validators/fooditems";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";

interface ModifyCategoriesProps {
  vendor_id: string;
}

const ModifyCategories = ({ vendor_id }: ModifyCategoriesProps) => {
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const { data: categories, isLoading: categoriesLoder } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/menu/vendor-category/?vendor=${vendor_id}&page=${page}`)
        .json<{ results: Category[]; count: number }>();
      return response;
    },
    queryKey: ["vendor-category", page],
    onError: (error) => {
      toast.error("Issue while fetching Departmets", {
        description: "Please Try Again",
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {categoriesLoder ? (
        <ListLoader />
      ) : !!categories && !!categories.results.length ? (
        <>
          <DataTable columns={columns} data={categories.results} />
          <PaginationWithLinks
            page={Number(page) || 1}
            pageSize={10}
            totalCount={categories.count}
            setPage={setPage}
          />
        </>
      ) : (
        <p>No Categoires Found</p>
      )}
    </>
  );
};

export default ModifyCategories;
