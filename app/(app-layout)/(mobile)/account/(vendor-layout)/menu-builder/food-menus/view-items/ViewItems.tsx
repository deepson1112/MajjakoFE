"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import ListLoader from "@/components/loaders/ListLoader";
import { columns } from "./columns";
import { toast } from "@/components/ui/use-toast";
import { Category } from "@/lib/validators/fooditems";
import { api } from "@/lib/fetcher";

interface ViewItemsProps {
  vendor_id: string;
  is_retail?: boolean;
}

const ViewItems = ({ vendor_id, is_retail }: ViewItemsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = axiosInstance.get("/menu/retail-items");
      return response;
    },
    // queryKey: ["food-items-list"],
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const { data: categoryData, isLoading: categoryLoder } = useQuery({
    queryFn: async () => {
      const response: Category[] = await api()
        .get(`/menu/vendor-category/?vendor=${vendor_id}`)
        .json();
      return response;
    },
    queryKey: ["vendor-category"],
    onError: (error) => {
      console.error(error);
    },
  });
  if (isLoading) return <ListLoader />;
  return data ? (
    <DataTable is_retail={is_retail} columns={columns} data={data?.data} />
  ) : (
    <p>No Data Found</p>
  );
};

export default ViewItems;
