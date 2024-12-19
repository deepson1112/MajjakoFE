"use client";

import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { addDays } from "date-fns";
import { DatePicker } from "@/components/DatePicker";
import { CouponType, CouponSchema } from "@/lib/validators/coupon";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const CouponHeaders = ({ is_retail }: { is_retail?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const url = is_retail
    ? "/retail-offers/retail-coupon/"
    : "/offers/view-available-coupons/";
  const form = useForm<CouponType>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      coupons_title: "",
      coupon_code: "",
      coupon_type: "Percentage Off",
      discount_amount: undefined,

      minimum_spend_amount: 0,
      maximum_redeem_amount: 0,
      limitation_for_user: 1,
      audience: "All Customer",
      start_date: new Date(),
      coupon_usage_limitation: 1,
      end_date: addDays(new Date(), 7),
      discount_percentages: undefined,
    },
  });

  console.log(form.formState.errors);

  const couponType = form.watch("coupon_type");

  const { mutate: handleAddCoupon, isLoading: handleAddCouponLoader } =
    useMutation({
      mutationFn: async (data: CouponType) => {
        const response = await api().post(data, url).json();
        return response;
      },
      onSuccess: () => {
        toast.success("Sucessfully added coupon");
        form.reset({
          coupons_title: "",
          coupon_code: "",
          coupon_type: "Percentage Off",
          discount_amount: 0,
          minimum_spend_amount: 0,
          maximum_redeem_amount: 0,
          limitation_for_user: 1,
          audience: "All Customer",
          start_date: new Date(),
          coupon_usage_limitation: 1,
          end_date: addDays(new Date(), 7),
        });
        setIsOpen(false);

        queryClient.invalidateQueries("coupon");
      },
      onError: (error: any) => {
        toast.error("Something went wrong", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-900">Coupons</h2>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <h4 className="text-lg font-semibold text-gray-700">
          Your Active Coupons
        </h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              Add New Coupon
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[750px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Exclusive Coupon Offers!</DialogTitle>
              <DialogDescription>
                You can add Exclusive Coupon Offer! here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => handleAddCoupon(data))}
              >
                <div className="py-4 flex px-2 flex-col gap-3 overflow-y-scroll h-[70vh]">
                  <div className="w-full px-3 flex flex-col md:flex-row gap-6">
                    <FormField
                      control={form.control}
                      name="coupons_title"
                      render={({ field }) => {
                        return (
                          <FormItem className="md:w-1/2">
                            <FormLabel>Coupon Title</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="coupon_code"
                      render={({ field }) => {
                        return (
                          <FormItem className="md:w-1/2">
                            <FormLabel>Coupon Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="w-full px-3 flex flex-col md:flex-row gap-6">
                    <FormField
                      control={form.control}
                      name="coupon_type"
                      render={({ field }) => (
                        <FormItem className="md:w-1/2 z-50">
                          <FormLabel>Coupon Type</FormLabel>
                          <Select
                            onValueChange={(e) => {
                              //   field.onChange(
                              //     e === "Flat Discount" ? true : false
                              //   );
                              form.setValue("coupon_type", e);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Coupon Type?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Percentage Off">
                                Percentage off
                              </SelectItem>
                              <SelectItem value="Flat Discount">
                                Flat Discount
                              </SelectItem>
                              <SelectItem value="Delivery Fee off">
                                Delivery Fee Percentage off
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {/* {!couponWatcher && (
                      <FormField
                        control={form.control}
                        name="percentage"
                        render={({ field }) => {
                          return (
                            <FormItem className="md:w-1/2">
                              <FormLabel>Percentage</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    )} */}

                    {couponType === "Percentage Off" ? (
                      <FormField
                        control={form.control}
                        name={`discount_percentages`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Discount Percentage</FormLabel>

                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="border-none bg-gray-100">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a discount percentages" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="20">20%</SelectItem>
                                <SelectItem value="30">30%</SelectItem>
                                <SelectItem value="40">40%</SelectItem>
                                <SelectItem value="50">50%</SelectItem>
                                <SelectItem value="75">75%</SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}

                    {couponType === "Flat Discount" ? (
                      <FormField
                        control={form.control}
                        name="discount_amount"
                        render={({ field }) => {
                          return (
                            <FormItem className="md:w-1/2">
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="w-full px-3 flex flex-col md:flex-row gap-6">
                    <FormField
                      control={form.control}
                      name="minimum_spend_amount"
                      render={({ field }) => {
                        return (
                          <FormItem className="md:w-1/2">
                            <FormLabel>Minimum spend</FormLabel>
                            <FormDescription>
                              The minimum order subtotal a customer needs to use
                              this coupon
                            </FormDescription>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="maximum_redeem_amount"
                      render={({ field }) => {
                        return (
                          <FormItem className="md:w-1/2">
                            <FormLabel>Maximum reedem value</FormLabel>
                            <FormDescription>
                              The maximum amount off a customer can get from
                              this coupon
                            </FormDescription>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="w-full px-3 flex flex-col md:flex-row gap-6">
                    <FormField
                      control={form.control}
                      name="limitation_for_user"
                      render={({ field }) => {
                        return (
                          <FormItem className="md:w-1/2">
                            <FormLabel>Limit for same user</FormLabel>
                            <FormDescription>
                              The number of times same user can apply this
                              coupon
                            </FormDescription>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="audience"
                      render={({ field }) => (
                        <FormItem className="md:w-1/2">
                          <FormLabel>Audiences</FormLabel>
                          <FormDescription>
                            Select targeted customer
                          </FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="All Customer" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  All customers
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="All Active Customer" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  All Active customers
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="New Customer" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  New customers only
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="coupon_usage_limitation"
                    render={({ field }) => {
                      return (
                        <FormItem className="md:w-1/2">
                          <FormLabel>Coupon Limitation</FormLabel>

                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            The number of times coupon can be used.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormItem className="space-y-3">
                    <FormLabel>Schedule Your Coupon Activation</FormLabel>
                    <DatePicker<CouponType> form={form} />
                  </FormItem>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    isLoading={handleAddCouponLoader}
                    disabled={handleAddCouponLoader}
                  >
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CouponHeaders;
