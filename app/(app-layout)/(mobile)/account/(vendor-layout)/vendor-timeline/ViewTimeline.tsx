import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { VendorTimelineType } from "@/types";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { EditVendorTimeline } from "./_crud/EditVendorTimeline";
import { DeleteVendorTimeline } from "./_crud/DeleteVendorTimeline";

const ViewTimeline = () => {
  const { data: timelines, isLoading: timelinesLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get("/vendor/vendor-timelines").json();
      return response as VendorTimelineType[];
    },
    queryKey: ["vendor-timelines"],
  });

  return (
    <>
      <h6 className="text-xl font-medium">Available Timelines</h6>

      {timelinesLoader ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      ) : !!timelines && !!timelines.length ? (
        <div className="w-full h-full p-7">
          <ul className="flex flex-col space-y-4">
            {timelines.map((timeline) => (
              <li
                key={timeline.id}
                className="border bg-gray-50 py-3 px-4 rounded-md flex items-center justify-between"
              >
                <div>
                  <h6>{timeline.hour_name}</h6>

                  <span className="text-xs text-gray-700">
                    {timeline.starting_hours} - {timeline.ending_hours}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <EditVendorTimeline {...timeline} />

                  <DeleteVendorTimeline
                    deleteTitle={timeline.hour_name}
                    id={timeline.id}
                    tag="vendor-timelines"
                    url="/vendor/vendor-timelines/"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center min-h-[10rem]">
          <span className="font-semibold text-gray-400">
            No Timeline created
          </span>
          <ViewTimeline />
        </div>
      )}
    </>
  );
};

export default ViewTimeline;
