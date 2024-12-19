"use client";

import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export interface PlatformOffers {
  id: number;
  audience: string;
  offer_name: string;
  start_date: string;
  end_date: string;
  active: boolean;
  discount_banner: string;
  created_date: string;
  created_by: number;
}

const ViewPlatformOffer = () => {
  const { data: platformOffers, isLoading: platformOffersLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-offers/admin/platform_offer/")
        .json<PlatformOffers[]>();
      return response;
    },
    queryKey: ["platform-offer"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return platformOffersLoader ? (
    <div>Loading...</div>
  ) : !!platformOffers ? (
    <DataTable columns={columns} data={platformOffers} />
  ) : (
    <div>No PlatformOffers</div>
  );
};

export default ViewPlatformOffer;
