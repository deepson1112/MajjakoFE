import { Button } from "@/components/ui/Button";
import { add } from "date-fns";
import React, { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { DatePicker } from "../DatePicker";
import ScheduleTime from "../ScheduleTime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/Form";
import TimeSelection from "@/components/TimeSelection";

export const ScheduleSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string(),
});

export type ScheduleSchemaType = z.infer<typeof ScheduleSchema>;
interface DeliveryScheduleProps {
  setCurrentDeliveryDT: Dispatch<
    SetStateAction<{ date: string; time: string; deliveryTime: string }>
  >;
}

const DeliverySchedule = ({ setCurrentDeliveryDT }: DeliveryScheduleProps) => {
  const [selectedTime, setSelectedTime] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: "",
    minutes: "",
  });

  console.log("This is selected time", selectedTime);

  const form = useForm<ScheduleSchemaType>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const handleTimeSchedule = (dateSelected: ScheduleSchemaType) => {
    const dateInput = dateSelected.date;
    const timeInput = dateSelected.time;

    const date = new Date(dateInput);
    const [hours, minutes] = timeInput.split(":").map(Number);

    date.setHours(hours, minutes, 0, 0);

    let isoString = date.toISOString();
    let datePart = isoString.split("T")[0];
    let timePart = isoString.split("T")[1].split(".")[0];

    let microseconds = "000000";

    let formattedDateTime = `${datePart}T${timePart}.${microseconds}Z`;

    setCurrentDeliveryDT({
      date: datePart,
      time: timeInput,
      deliveryTime: formattedDateTime,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleTimeSchedule)}>
          <div className="flex flex-col items-stretch space-y-4">
            <h6 className="font-semibold">Schedule Time</h6>
            <div className="flex flex-col gap-2">
              <DatePicker form={form} />
            </div>
            <div>
              <TimeSelection
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            </div>
            <Button>Confirm</Button>
          </div>
        </form>
      </Form>

      <div className="flex items-center w-full">
        <span className="flex-grow bg-gray-200 rounded h-[1.5px]"></span>
        <span className="mx-3 font-medium">or</span>
        <span className="flex-grow bg-gray-200 rounded h-[1.5px]"></span>
      </div>

      <div>
        <h6 className="font-semibold mb-3">Quick Delivery</h6>
        <Button
          type="button"
          variant={"outline"}
          className="w-full"
          onClick={() => {
            const now = new Date();
            // Add 24 hours to the current date and time
            const futureDate = add(now, { hours: 24 });
            const year = futureDate.getUTCFullYear();
            const month = String(futureDate.getUTCMonth() + 1).padStart(2, "0");
            const day = String(futureDate.getUTCDate()).padStart(2, "0");
            const hours = String(futureDate.getUTCHours()).padStart(2, "0");
            const minutes = String(futureDate.getUTCMinutes()).padStart(2, "0");
            const seconds = String(futureDate.getUTCSeconds()).padStart(2, "0");
            const microseconds =
              String(futureDate.getUTCMilliseconds()).padStart(3, "0") + "000";

            const formattedNow = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}Z`;

            setCurrentDeliveryDT({
              date: now.toISOString().split("T")[0],
              time: now.toTimeString().split(" ")[0],
              deliveryTime: formattedNow,
            });
          }}
        >
          Quick Delivery
        </Button>
      </div>
    </>
  );
};

export default DeliverySchedule;
