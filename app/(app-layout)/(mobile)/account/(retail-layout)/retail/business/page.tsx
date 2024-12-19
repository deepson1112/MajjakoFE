"use client";
import React from "react";
import { UserType } from "@/types";
import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import ListLoader from "@/components/loaders/ListLoader";
import MyBusinessContainer from "@/components/pages/settings/mybusiness";

export default function RestaurantPage() {
  const { data: vendor, isLoading: vendorLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get(`/user/user-update/`).json<UserType[]>();

      return response;
    },
    queryKey: ["vendor"],
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (vendorLoader) return <ListLoader />;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Edit store profile
        </h2>
        <p className="text-gray-500">
          Please fill in all the mandatory fields marked with an asterisk
          <span className="text-brand"> (*)</span>.
        </p>
      </div>
      {vendor && vendor.length > 0 && <MyBusinessContainer {...vendor[0]} />}
    </>
  );
}
