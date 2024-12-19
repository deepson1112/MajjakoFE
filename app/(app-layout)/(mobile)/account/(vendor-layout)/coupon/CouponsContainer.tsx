"use client";
import React from "react";
import { columns } from "./columns";
import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { CouponType } from "@/lib/validators/coupon";
import EmptyDepartment from "@/components/others/EmptyDepartment";
import ListLoader from "@/components/loaders/ListLoader";

const CouponsContainer = ({ is_retail }: { is_retail?: boolean }) => {
  const url = is_retail
    ? "/retail-offers/retail-coupon/"
    : "/offers/view-available-coupons/";
  const { data: coupons, isLoading: couponsLoader } = useQuery<CouponType[]>({
    queryFn: async () => {
      const response = await api().get(url).json();
      return response as CouponType[];
    },
    queryKey: ["coupon"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {couponsLoader ? (
        <ListLoader />
      ) : !!coupons && !!coupons.length ? (
        <DataTable columns={columns} data={coupons} />
      ) : (
        <EmptyDepartment title="Coupon" />
      )}
    </div>
  );
};

export default CouponsContainer;
