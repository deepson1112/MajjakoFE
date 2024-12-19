import { Controller, UseFormReturn } from "react-hook-form";
import TimeInput from "react-time-picker-input";
import "react-time-picker-input/dist/components/TimeInput.css";
import { useEffect } from "react";
import { ScheduleSchemaType } from "./CheckoutTime";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export default function ScheduleTime({
  form,
}: {
  form: UseFormReturn<ScheduleSchemaType>;
}) {
  const { errors } = form.formState;

  useEffect(() => {
    form.reset({
      time: "12:00",
    });
  }, [form]);

  return (
    <>
      <Controller
        name="time"
        control={form.control}
        render={({ field }) => (
          <div className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
            {/* <div className="w-[240px] pl-3 bg-gray-100 border-none rounded-lg border"> */}
            <TimeInput
              {...field}
              value={field?.value || "00:00"}
              hour12Format
              eachInputDropdown
              manuallyDisplayDropdown
            />
          </div>
        )}
      />
      {errors && <p>{errors?.time?.message}</p>}
    </>
  );
}
