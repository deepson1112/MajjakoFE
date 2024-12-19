"use client";
import Image from "next/image";
import React from "react";
import { api } from "@/lib/fetcher";
import { OrderType } from "@/lib/validators/order";
import { useQuery } from "react-query";
import Orderfooter from "./orderfooter";
import OrderBody from "./orderbody";
import Orderhead from "./orderhead";

interface Props {
  params: {
    order_id: string;
  };
}

export default function Page({ params }: Props) {
  console.log(params?.order_id);
  const { data: data, isLoading: orderLoader } = useQuery<OrderType>({
    queryFn: async () => {
      const response = await api()
        .get(`/orders/orders?order_number=${params?.order_id}`)
        .json();
      return response as OrderType;
    },
    queryKey: ["order"],
  });
  console.log(data);
  // const convertDate = (date: String) => {
  //   const { day, month, year } = isoDateConverter(date as string);
  //   return <div>{`${year}/${month}/${day}`}</div>;
  // };
  return (
    data &&
    //@ts-ignore
    data.map((d, i) => (
      <div key={i} className="overflow-hidden">
        <div className="bg-[white] rounded-b-md">
          {/* <div className="p-9">
            <div className="space-y-6 text-slate-700">
              <Image
                alt="logo"
                height={1000}
                width={1000}
                className="object-cover w-12 h-12"
                src="/final.png"
              />
              <div className="flex">
                <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                  Thank You For Your Order
                </p>
                <div className="ml-auto flex flex-col text-sm capitalize">
                  <p>
                    {d?.first_name} {d?.last_name}
                  </p>
                  <p>
                    {d?.address} {d?.state} {d?.city}
                  </p>
                  <p>{d?.phone}</p>
                  <p>{d?.email}</p>
                </div>
              </div>
              <div className="left-4 text-sm">
                <h1 className="font-bold capitalize">
                  Hello {d?.first_name} {d?.last_name},
                </h1>
                <p>Review Your Order Details</p>
              </div>
            </div>
          </div>
          <div className="px-8">
            <div className="flex flex-wrap justify-between w-full">
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">
                  Order Date:
                </p>
                <p className="font-bold">
                  {data && d?.created_at ? convertDate(d?.created_at) : null}
                </p>
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">Order No:</p>
                <p className="font-bold w-[180px]">{d?.order_number}</p>
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">
                  Payment Method:
                </p>
                <p className="font-bold">Majjakodeals</p>
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">Order For:</p>
                <p className="font-bold">
                  {data && d?.delivery_date
                    ? convertDate(d?.delivery_date)
                    : null}
                </p>
              </div>
            </div>
          </div> */}
          <Orderhead data={d} />

          <div className="p-9">
            <div className="flex flex-col mx-0 mt-8">
              <table className="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="font-bold py-3.5 pl-4 pr-3 text-left text-sm text-slate-700 sm:pl-6 md:pl-0"
                    >
                      Name & Description
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm font-bold text-slate-700 sm:table-cell"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right text-sm font-bold text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <OrderBody data={d} />
                  {/* {data &&
                    d!.order_vendor &&
                    d!.order_vendor.map(
                      //@ts-ignore
                      (food, i) =>
                        food.ordered_food.length > 0 &&
                        //@ts-ignore
                        food.ordered_food.map((order, index) => (
                          <tr key={index} className="border-b border-slate-200">
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                              <div className=" flex flex-col font-bold text-sm text-slate-700">
                                <p>
                                  {order?.food_item?.food_title || "No Title"}
                                </p>
                                {order?.food_item?.order_food_addons?.map(
                                  //@ts-ignore
                                  (addon, ind) => (
                                    <p
                                      className="text-sm font-normal"
                                      key={ind}
                                    >
                                      {addon?.customization?.title}
                                    </p>
                                  )
                                )}
                              </div>
                              <div className="mt-0.5 text-slate-500 sm:hidden">
                                {order?.quantity || 0} Qty
                              </div>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              {order?.quantity || 0} Qty
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              ${order?.food_item?.price || 0} each
                              <div className=" flex flex-col text-sm text-slate-500">
                                {order?.food_item?.order_food_addons?.map(
                                  //@ts-ignore
                                  (addon, ind) => (
                                    <p className="text-sm" key={ind}>
                                      +${addon?.customization?.price}
                                    </p>
                                  )
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                    )} */}
                </tbody>
                {/* <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-6 pl-6 pr-3 text-sm font-bold  text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pl-4 pr-3 text-sm font-bold  text-left text-slate-500 sm:hidden"
                    >
                      Subtotal
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      $
                      {d?.total! -
                        d?.delivery_charge! -
                        d?.total_tax! -
                        d?.tip!}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-6 pl-6 pr-3 text-sm font-bold  text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Delivery Fee
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pl-4 pr-3 text-sm font-bold  text-left text-slate-500 sm:hidden"
                    >
                      Delivery Fee
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${d?.delivery_charge}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 pl-6 pr-3 text-sm font-bold  text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Tax
                    </th>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-bold  text-left text-slate-500 sm:hidden"
                    >
                      Tax
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${d?.total_tax}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 pl-6 pr-3 text-sm font-bold  text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Tip
                    </th>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-bold  text-left text-slate-500 sm:hidden"
                    >
                      Tip
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${d?.tip}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                    >
                      Total
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${d?.total}
                    </td>
                  </tr>
                </tfoot> */}
                <Orderfooter data={d} />
              </table>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
