"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import { SubTotalcalculationType } from "@/types";
import { UseMutateFunction, useMutation } from "react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import CartContainerList from "./CartContainerList";
import { Input } from "@/components/ui/Input";
import { Ticket, X } from "lucide-react";
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
import { couponCodeSchema, CouponCodeType } from "@/lib/validators/offers";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";

const CartItemsList = ({
  userCart,
  userCartLoader,
  handleApplyCouponCodeTip,
  handleApplyCouponCodeTipLoader,
  couponCode,
  setCouponCode,
  tip,
  loyalty,
}: {
  userCart: any;
  userCartLoader: boolean;
  handleApplyCouponCodeTipLoader: boolean;
  handleApplyCouponCodeTip: UseMutateFunction<
    SubTotalcalculationType,
    any,
    { code: string; tipValue: string; loyaltyCode: string },
    unknown
  >;
  couponCode: string;
  setCouponCode: Dispatch<SetStateAction<string>>;
  tip: string;
  loyalty: string;
}) => {
  const router = useRouter();
  const form = useForm<CouponCodeType>({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: {
      coupon: "",
    },
  });

  const {
    mutate: handleApplyCouponCode,
    isLoading: handleApplyCouponCodeLoader,
  } = useMutation({
    mutationFn: async (couponCode: CouponCodeType) => {
      const response = await api()
        .get(
          `/marketplace/sub_total_calculations/?coupon=${couponCode.coupon},/`
        )
        .json();
      return response;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("user-sidecart-data");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
  useEffect(() => {
    if (userCart?.vendors.length <= 0) {
      router.push("/");
    }
  }, [userCart?.vendors.length, router]);
  return (
    <section>
      {userCart?.vendors.length ? (
        <>
          <Accordion
            type="multiple"
            className="w-full"
            // defaultValue={userCart?.vendors[0].vendor_name}
            // @ts-ignore
            defaultValue={userCart?.vendors.map((vendor) => vendor.vendor_name)}
          >
            {/* @ts-ignore */}

            {userCart?.vendors.map((vendor, index) => (
              <AccordionItem value={vendor.vendor_name} key={index}>
                <AccordionTrigger>{vendor.vendor_name}</AccordionTrigger>
                <AccordionContent>
                  <>
                    <CartContainerList
                      userCart={vendor.food_items!}
                      userCartLoader={userCartLoader}
                    />
                    {!vendor.coupons_offer ? (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full border-none"
                      >
                        <AccordionItem
                          value={"coupon-amount"}
                          className="border-none"
                        >
                          <AccordionTrigger className="bg-white border p-2">
                            <div className="flex items-center gap-2">
                              <Ticket /> Apply Restaurant Code
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit((data) => {
                                  setCouponCode(data.coupon);
                                  // @ts-ignore
                                  handleApplyCouponCodeTip({
                                    code: `${data.coupon},`,
                                    tipValue: tip,
                                    loyaltyCode: loyalty,
                                  });
                                })}
                                className="space-y-8"
                              >
                                <FormField
                                  control={form.control}
                                  name="coupon"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Coupon Code</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="bg-gray-100 border-none"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Enter a valid coupon code.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="submit"
                                  isLoading={handleApplyCouponCodeTipLoader}
                                  disabled={handleApplyCouponCodeTipLoader}
                                >
                                  Apply
                                </Button>
                              </form>
                            </Form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <div className="border px-3 py-2 rounded-lg flex items-center justify-between">
                        <div>
                          Current Applied Coupon:{" "}
                          <span className="font-semibold">
                            {vendor.coupons_offer}
                          </span>
                        </div>
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            setCouponCode("");
                            // @ts-ignore
                            handleApplyCouponCodeTip({
                              code: ``,
                              tipValue: tip,
                              loyaltyCode: loyalty,
                            });
                          }}
                        />
                      </div>
                    )}
                  </>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      ) : (
        <>
          <div className="w-full h-full grid place-items-center py-24">
            <div className="-mt-24">
              <Image
                src={"/empty-cart.png"}
                alt="empty-cart-image"
                width={512}
                height={512}
                className="h-64 w-64 max-auto object-cover  object-center"
              />
              <p>
                Your Cart is empty{" "}
                <Link
                  href={"/marketplace"}
                  className="text-brand hover:text-brand_hover underline outline-none border-none"
                >
                  Add Items
                </Link>{" "}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartItemsList;
