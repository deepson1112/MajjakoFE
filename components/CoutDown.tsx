"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog";
import { Input } from "./ui/Input";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";

const subscribeSchema = z.object({
  email: z.string().email(),
});

type Subscribe = z.infer<typeof subscribeSchema>;

export function CoutDown() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const christmasDate = new Date(new Date().getFullYear(), 11, 25);

  const targetDate =
    new Date() > christmasDate
      ? new Date(new Date().getFullYear() + 1, 11, 25)
      : christmasDate;

  const form = useForm<Subscribe>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: handleSubscribe, isLoading: handleSubscribeLoader } =
    useMutation({
      mutationFn: async (payload: Subscribe) => {
        const response = await api()
          .post(payload, "/newsletter/subscribe")
          .json();
        return response;
      },
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (error: any) => {
        toast.error("Something went wrong", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  useEffect(() => {
    const isComingSoonSeen = sessionStorage.getItem("comming-soon") === "1";

    if (!isComingSoonSeen) {
      setIsModalOpen(true);
      sessionStorage.setItem("comming-soon", "1");
    }
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent
        className="w-11/12 sm:max-w-[655px] bg-brand text-white border-none py-3 md:py-12"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="relactive flex flex-col items-center space-y-3">
          <Image
            src={"/comming-soon/bulb.png"}
            alt="bulb-image"
            width={144}
            height={144}
            className="absolute top-0 w-[300px] h-[300px] object-cover object-center"
          />
          <div className="w-full pt-12 flex flex-col items-center space-y-3">
            <h5 className="tracking-widest font-semibold">STAY TUNED</h5>
            <h4 className="text-xl md:text-3xl font-bold tracking-wider">
              LAUNCHING SOON
            </h4>
            <Countdown date={targetDate} renderer={renderer} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => handleSubscribe(data))}
                className="w-full flex flex-col items-center space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-center space-y-2">
                      <FormLabel className="block mb-2 text-white">
                        We&apos;ll let you know when we are launching.
                      </FormLabel>
                      <div className="max-w-sm w-full flex items-center">
                        <FormControl className="">
                          <Input
                            className="w-full rounded-r-none text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Email Address"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          className="w-full bg-[#30b9d7] rounded-l-none max-w-fit px-4 focus:outline-0 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          disabled={handleSubscribeLoader}
                        >
                          Notiy Me
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 p-6 w-full">
      <div className="flex flex-col items-center bg-brand text-white p-3 rounded-3xl">
        <div className="flex items-center gap-3">
          {!!days.toString()[0] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {days.toString()[0]}
            </span>
          ) : null}
          {!!days.toString()[1] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {days.toString()[1]}
            </span>
          ) : null}
        </div>

        <span>Days</span>
      </div>

      <div className="flex flex-col items-center bg-brand text-white p-3 rounded-3xl">
        <div className="flex items-center gap-3">
          {!!hours.toString()[0] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {hours.toString()[0]}
            </span>
          ) : null}
          {!!hours.toString()[1] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {hours.toString()[1]}
            </span>
          ) : null}
        </div>
        <span>Hours</span>
      </div>

      <div className="flex flex-col items-center bg-brand text-white p-3 rounded-3xl">
        <div className="flex items-center gap-3">
          {!!minutes.toString()[0] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {minutes.toString()[0]}
            </span>
          ) : null}

          {!!minutes.toString()[1] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {minutes.toString()[1]}
            </span>
          ) : null}
        </div>
        <span>Minutes</span>
      </div>

      <div className="flex flex-col items-center bg-brand text-white p-3 rounded-3xl">
        <div className="flex items-center gap-3">
          {!!seconds.toString()[0] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {seconds.toString()[0]}
            </span>
          ) : null}

          {!!seconds.toString()[1] ? (
            <span className=" text-5xl md:text-6xl bg-gradient-to-t from-white/10 to-white/70 p-1 rounded-md outline outline-white/20">
              {seconds.toString()[1]}
            </span>
          ) : null}
        </div>
        <span>Seconds</span>
      </div>
    </div>
  );
};
