"use client";
import React from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { Skeleton } from "../ui/Skeleton";
import { api } from "@/lib/fetcher";
import MaxWidthWrapper from "../MaxWidthWrapper";

export type VendorProfile = {
  age_restriction: boolean;
  created_at: string;
  customer_type: string;
  free_delivery: any[];
  get_one_for_free: any[];
  id: number;
  is_approved: boolean;
  modified_at: string;
  save_on_items: any[];
  store_offer: any[];
  tax_exempt: boolean;
  tax_rate: number;
  user: number;
  user_profile: number;
  vendor_cover_image: string;
  vendor_license: string;
  vendor_location: string;
  vendor_location_latitude: string;
  vendor_location_longitude: string;
  vendor_logo: string;
  vendor_name: string;
  vendor_slug: string;
};

const VendorProfileSection = ({ id }: { id: number | string }) => {
  const { data, isLoading: profileImageLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/vendor/vendor/${id}/`)
        .json<VendorProfile>();
      return response;
    },
    queryKey: [`vendor-profile-${id}`],
    onError: (error) => {
      console.error("Cannot get the profile error", error);
    },
  });
  console.log("THIs is vendor profile stup", data);

  if (profileImageLoader) return <Skeleton className="w-full h-[270px]" />;

  return (
    <>
      <header className="relative isolate pt-16 m-4 rounded-lg overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-full h-full">
            {data?.vendor_cover_image ? (
              <Image
                alt="resturatn-cover-image"
                src={data?.vendor_cover_image!}
                width={1920}
                height={1080}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gray-100"></div>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full bg-gray-900/30" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-x-6">
              {data?.vendor_logo ? (
                <Image
                  src={data?.vendor_logo!}
                  alt="Restuarnt-img"
                  width={500}
                  height={500}
                  className="h-20 w-20 sm:h-32 sm:w-32 flex-none object-cover object-center rounded-full ring-2 ring-white"
                />
              ) : (
                <div className="h-20 w-20 sm:h-32 sm:w-32 flex-none bg-gray-100 rounded-full ring-2 ring-white"></div>
              )}
              <h1>
                <div className="mt-1 text-base font-semibold leading-6 text-gray-200">
                  {data?.vendor_name}
                </div>
                <div className="text-sm leading-6 text-gray-300">
                  Kathmandu, Nepal
                </div>
              </h1>
            </div>
          </div>
        </div>
      </header>
      <MaxWidthWrapper>
        <h1 className="text-4xl font-semibold">{data?.vendor_name}</h1>
      </MaxWidthWrapper>
    </>
  );
};

export default VendorProfileSection;
