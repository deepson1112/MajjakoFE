"use client";
import ListLoader from "@/components/loaders/ListLoader";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const PercentOffPage = () => {
  const { data, isLoading: percentOffLoader } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("/offers/store-offer/");
      return data;
    },
    queryKey: ["percent-off"],
    onSuccess: (data) => {
      // console.log("This is the response ", data);
    },
    onError: (error: any) => [console.error(error)],
  });

  return (
    <div className="py-3">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Percent Off</h2>
      {percentOffLoader ? (
        <ListLoader />
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default PercentOffPage;
