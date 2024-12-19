"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import StepForm from "./StepForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import useUser from "@/lib/useUser";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { OfferList } from "@/types";
import ProfileSetupLoader from "./ProfileSetupLoader";
import { useRouter } from "next/navigation";
import { VendorProfile } from "@/components/vendor/VendorProfileSection";

const StepperForm = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const title = "Please Complete This Vendor Profile Setup";
  const description = "To proceed further you need to complete this setup!!";

  const { data: offersList, isLoading: offersListLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/vendor/offerings-list/")
        .json<OfferList[]>();
      return response;
    },
    queryKey: ["offerlists"],
    onError: (error: any) => {
      console.error(error);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: vendorDetails, isLoading: vendorDetailsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/vendor/vendor/${user?.vendor_id}`)
        .json<VendorProfile>();
      return response;
    },
    queryKey: ["vendor-details"],
    onSuccess: (data) => {
      console.log("This is data response", data);
    },
    onError: (error: any) => {
      console.error(error);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user && user.role === 2 && user.profile_setup) {
      router.push("/");
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-16 mt-4 lg:mt-10">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <div className={cn("mt-8")} />

      <div className="bg-yellow-200 px-4 py-2 my-4 rounded-md text-lg flex items-center max-w-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
        >
          <path
            fill="currentColor"
            d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
          ></path>
        </svg>
        <span className="text-yellow-800 text-sm">
          All fields must be filled to proceed to next step.
        </span>
      </div>
      {isLoading && vendorDetailsLoader ? (
        <ProfileSetupLoader />
      ) : (
        <MaxWidthWrapper className="py-5">
          <StepForm
            bussinessName={vendorDetails?.vendor_name}
            user={user!}
            offersList={offersList}
            offersListLoader={offersListLoader}
          />
        </MaxWidthWrapper>
      )}
    </div>
  );
};
export default StepperForm;
