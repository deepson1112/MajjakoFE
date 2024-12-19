"use client";
import ListLoader from "@/components/loaders/ListLoader";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { columns, PercentOfResponseType } from "./columns";
import { DataTable } from "./data-table";

const SaveOneMenuItemPage = () => {
  const { data: saveOnMenuOffer, isLoading: saveOneMenuOfferLoader } = useQuery(
    {
      queryFn: async () => {
        const response = await api()
          .get("/retail-offers/retail-save-on-item-offer/")
          .json<PercentOfResponseType[]>();
        return response;
      },
      queryKey: ["retail-save-on-menu"],
      onSuccess: (data) => {
        // console.log("This is the response ", data);
      },
      onError: (error: any) => {
        console.error(error);
      },
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="py-3">
      <h2 className="text-3xl font-semibold tracking-tight mb-4">
        Save on Products
      </h2>
      {saveOneMenuOfferLoader ? (
        <ListLoader />
      ) : saveOnMenuOffer?.length ? (
        <DataTable data={saveOnMenuOffer} columns={columns} />
      ) : (
        <div>No Save On Menu Offers</div>
      )}
    </div>
  );
};

export default SaveOneMenuItemPage;
