import React from "react";
import Collections from "./collections";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import Heading from "./heading";

interface VendorSet {
  id: number;
  is_approved: boolean;
  vendor_name: string;
  vendor_phone: string;
}

interface OffersList {
  description: string;
  id: number;
  image: string;
  name: string;
  vendor_set: VendorSet[];
}

const OffersList = () => {
  const { data: offerings, isLoading: offeringsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/vendor/offerings-list")
        .json<OffersList[]>();
      return response;
    },
  });
  return offeringsLoader ? (
    <div>Loading..</div>
  ) : (
    <>
      <Heading title="Shop By Collections" link="" />
      <div className="w-full no-visible-scrollbar py-6 grid grid-rows-1 grid-flow-col overflow-x-auto md:grid-rows-none md:grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 place-items-center ">
        {offerings?.length &&
          offerings.map((offer) => (
            <Collections
              link=""
              key={offer.id}
              title={offer.name}
              textclass="text-[#52A4A1]"
              image={offer.image}
            />
          ))}
      </div>
    </>
  );
};

export default OffersList;
