"use client";

import ListLoader from "@/components/loaders/ListLoader";
import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const SaveOneMenuItemPage = () => {
  const { data, isLoading: saveOneMenuOfferLoader } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("/offers/save-on-items/");
      return data;
    },
    queryKey: ["save-on-menu"],
    onError: (error: any) => [console.error(error)],
  });

  return (
    <div className="py-3">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Save on Menu Items
      </h2>
      {saveOneMenuOfferLoader ? (
        <ListLoader />
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default SaveOneMenuItemPage;
