"use client";
import ListLoader from "@/components/loaders/ListLoader";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { api } from "@/lib/fetcher";
import { PercentOffType } from "@/lib/validators/offers";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const PercentOffPage = () => {
  const { data, isLoading: percentOffLoader } = useQuery({
    queryFn: async () => {
      const data = await api()
        .get("/retail-offers/retail-store-offer/")
        .json<PercentOffType[]>();
      return data;
    },
    queryKey: ["retail-percent-off"],
    onSuccess: (data) => {
      console.log("This is the response ", data);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="py-3">
      <h2 className="text-3xl font-semibold tracking-tight mb-4">
        Percent Off
      </h2>
      {percentOffLoader ? (
        <ListLoader />
      ) : !!data?.length ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <div>
          <h6 className="text-center">No Offers Available</h6>
        </div>
      )}
    </div>
  );
};

export default PercentOffPage;
