import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { VendorTimelineType } from "@/types";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { TimePickerDemo } from "../time-picker";
import { useState } from "react";
import { timeExtract } from "../TimeLineForm";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { useMutation } from "react-query";
import MultiSelectDropdown from "@/components/MultiSelectDropDown";
import { WEEK_DAYS } from "@/configs/constants";
import { toast } from "sonner";

function createDateWithUTCTime(timeString: string) {
  let currentDate = new Date();
  let dateString = currentDate.toISOString().slice(0, 10);
  let dateTimeString = `${dateString}T${timeString}Z`;
  return new Date(dateTimeString);
}

export function EditVendorTimeline({
  ending_hours,
  hour_name,
  id,
  starting_hours,
  vendor,
  week_days,
}: VendorTimelineType) {
  const [startDate, setStartDate] = useState(
    createDateWithUTCTime(starting_hours)
  );

  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    !!week_days && !!week_days.length ? week_days : []
  );

  const [isEditTimelineModalOpen, setIsEditTimelineModalOpen] = useState(false);

  const [endDate, setEndDate] = useState(createDateWithUTCTime(ending_hours));

  const { register, handleSubmit } = useForm({
    defaultValues: {
      hour_name: hour_name,
    },
  });

  const {
    mutate: updateVendorTimelineFn,
    isLoading: updateVendorTimelineFnLoader,
  } = useMutation<Response, AxiosError, { hour_name: string }>({
    // @ts-ignore
    mutationFn: async (data) => {
      const response = await api()
        .patch(data, `/vendor/vendor-timelines/${id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Updated timeline successfully");

      queryClient.invalidateQueries("vendor-timelines");
      setIsEditTimelineModalOpen(false);
    },
    onError: (error: any) => {
      toast.error("Unable to update the timline", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const updateVendorTimeline = (data: { hour_name: string }) => {
    const payload = {
      hour_name: data.hour_name,
      starting_hours: timeExtract(startDate ? startDate : new Date()),
      ending_hours: timeExtract(endDate ? endDate : new Date()),
      vender: vendor,
    };

    updateVendorTimelineFn(payload);
  };

  return (
    <Dialog
      open={isEditTimelineModalOpen}
      onOpenChange={setIsEditTimelineModalOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="h-4 w-4" />{" "}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit {hour_name}</DialogTitle>
          <DialogDescription>
            Make changes to your timline. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(updateVendorTimeline)}>
          <div className="flex-1">
            <div className="space-y-4 mb-6">
              <h6 className="text-xl font-medium">Timeline Name</h6>
              <Input
                className="bg-gray-100 border-none max-w-sm"
                placeholder="Enter the name for the timeline"
                {...register("hour_name")}
              />
            </div>

            <div className="space-y-4 mb-6">
              <MultiSelectDropdown
                formFieldName={"weeks"}
                options={WEEK_DAYS}
                onChange={(selectedValue) => {
                  console.debug("selectedValue", selectedValue);
                }}
                prompt="Select the available days"
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>

            <div className="space-y-4 mb-6">
              <h6 className="text-xl font-medium">Starting Hour</h6>
              {/* @ts-ignore */}
              <TimePickerDemo date={startDate} setDate={setStartDate} />
            </div>
            <div className="space-y-4 mb-6">
              <h6 className="text-xl font-medium">Closing Hour</h6>
              {/* @ts-ignore */}
              <TimePickerDemo date={endDate} setDate={setEndDate} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              isLoading={updateVendorTimelineFnLoader}
              disabled={updateVendorTimelineFnLoader}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
