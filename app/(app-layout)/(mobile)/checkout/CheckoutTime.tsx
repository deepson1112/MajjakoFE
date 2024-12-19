import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { ChevronDown } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/Form";
import ScheduleTime from "./ScheduleTime";

export const ScheduleSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string(),
});

export type ScheduleSchemaType = z.infer<typeof ScheduleSchema>;

interface CheckoutTimeProps {
  currentDeliveryDT: { date: string; time: string; deliveryTime: string };
  setCurrentDeliveryDT: Dispatch<
    SetStateAction<{ date: string; time: string; deliveryTime: string }>
  >;
}

const CheckoutTime = ({
  currentDeliveryDT,
  setCurrentDeliveryDT,
}: CheckoutTimeProps) => {
  const [isOpen, setIsopen] = useState(false);

  const form = useForm<ScheduleSchemaType>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      date: new Date(),
      time: "12:00",
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

    setIsopen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Schedule for Later <ChevronDown />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Schedule Delivery</DialogTitle>
          <DialogDescription>
            Set a custom time and date for your delivery
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleTimeSchedule)}>
            <div className="flex flex-col items-stretch space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Select Date</Label>
                <DatePicker form={form} />
              </div>
              <div>
                <ScheduleTime form={form} />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Schedule</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutTime;
