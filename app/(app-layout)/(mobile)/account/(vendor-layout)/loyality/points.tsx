"use client";
import { Skeleton } from "@/components/ui/Skeleton";
import { axiosInstance } from "@/lib/axiosInstance";
import useUser from "@/lib/useUser";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

function Points() {
  const { user, isLoading } = useUser();

  const { data: userProfile, isLoading: profileImageLoader } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/user/user-profile/${user?.profile_id}`
      );
      return response;
    },
    queryKey: ["single-profile"],
    onError: (error) => {
      toast.error("Error While fetching loyality!!", {
        description: "Please Try Again",
      });
    },
  });
  if (isLoading || profileImageLoader)
    return <Skeleton className="w-full h-[270px]" />;
  return (
    userProfile && (
      <div className="flex flex-col items-center">
        <p className="text-2xl font-sans text-black font-semibold tracking-wide mb-2">
          Hi <span className="capitalize">{user?.first_name}</span>!
        </p>
        <p className=" text-xl tracking-wider font-medium text-orange-700 pb-12">
          You Have {userProfile.data.loyalty_points.toFixed(2)} Points
        </p>
      </div>
    )
  );
}

export default Points;
