"use client";

import React from "react";
import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import GalleryView from "@/components/galleryView/gallery";
import { VariationImageType } from "@/types/variationimage";
import { toast } from "sonner";

export default function Page() {
  const { data: variationImage, isLoading: variationImageLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/variations-image/")
        .json<VariationImageType[]>();
      return response;
    },
    queryKey: ["retail-variations-image"],
    onError: (error) => {
      toast.error("Failed to Load Gallery Images.", {
        description: "Please try again!!",
      });
    },
  });
  if (variationImageLoader) return <p>Loading...</p>;
  return (
    <main className="min-h-screen flex justify-center items-center">
      <GalleryView
        uploadUrl="/retails/variations-image/"
        images={variationImage}
        variation={"65"}
      />
    </main>
  );
}
