"use client";
import React from "react";
import { useQuery } from "react-query";
import { AddOpeningHour } from "./add";
import { EditOpeningHour } from "./edit";
import { WEEK_DAYS } from "@/configs/constants";
import { axiosInstance } from "@/lib/axiosInstance";
import { Skeleton } from "@/components/ui/Skeleton";
import { OpeningHrType } from "@/lib/validators/openinghrs";

const OpeningHoursPage = () => {
  const { data: openinghr, isLoading: openinghrLoader } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("vendor/opening-hours/");
      return response.data as OpeningHrType[];
    },
    queryKey: ["vendor-openinghr"],
  });
  console.log(openinghr);
  if (openinghrLoader) return <Skeleton className="h-52 w-full rounded-md" />;

  return openinghr && !!openinghr.length ? (
    <div>
      <div className="mx-auto max-w-7xl flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Opening Hours</h1>
        <AddOpeningHour />
      </div>
      <div className="grid  my-4 grid-cols-1 lg:grid-cols-2 gap-4">
        {openinghr.map((day, i) => (
          <EditOpeningHour
            key={i}
            id={day.id}
            vendor={day.vendor}
            title={WEEK_DAYS[(parseInt(day.day!) - 1)!]}
            from_hour={day.from_hour}
            to_hour={day.to_hour}
            day={day.day}
            is_closed={day.is_closed!}
          />
        ))}
      </div>
    </div>
  ) : (
    <p>No Opening Hours Found!</p>
  );
};

export default OpeningHoursPage;
