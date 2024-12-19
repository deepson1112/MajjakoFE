import React from "react";
import Image from "next/image";
import { isoDateConverter } from "@/lib/utils";
import { OrderDetails } from "./orderfooter";
import { RetailOrderConfirmation } from "../retail-orders/[order_id]/page";

// interface OrderDetails {
//   first_name: string;
//   last_name: string;
//   address: string;
//   state: string;
//   city: string;
//   phone: string;
//   email: string;
//   created_at: string;
//   order_number: string;
//   delivery_date?: string;
// }

interface Props {
  data: RetailOrderConfirmation;
}

const convertDate = (date: String) => {
  const { day, month, year } = isoDateConverter(date as string);
  return <div>{`${year}/${month}/${day}`}</div>;
};

const Orderhead: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className="p-9">
        <div className="space-y-6 text-slate-700">
          <Image
            alt="logo"
            height={1000}
            width={1000}
            className="object-center w-28 h-28"
            src="/final.svg"
          />
          <div className="flex">
            <p className="text-xl font-extrabold tracking-tight uppercase font-body">
              Thank You For Your Order
            </p>
            <div className="ml-auto flex flex-col text-sm capitalize">
              <p>
                {data.first_name} {data.last_name}
              </p>
              <p>
                {data.address} {data.state} {data.city}
              </p>
              <p>{data.phone}</p>
              <p>{data.email}</p>
            </div>
          </div>
          <div className="left-4 text-sm">
            <h1 className="font-bold capitalize">
              Hello {data.first_name} {data.last_name},
            </h1>
            <p>Review Your Order Details</p>
          </div>
        </div>
      </div>
      <div className="px-8">
        <div className="flex flex-wrap justify-between w-full">
          <div className="text-sm font-light text-slate-500">
            <p className="text-sm font-normal text-slate-700">Order Date:</p>
            <p className="font-bold">
              {data && data?.created_at ? convertDate(data?.created_at) : null}
            </p>
          </div>
          <div className="text-sm font-light text-slate-500">
            <p className="text-sm font-normal text-slate-700">Order No:</p>
            <p className="font-bold w-[180px]">{data?.order_number}</p>
          </div>
          <div className="text-sm font-light text-slate-500">
            <p className="text-sm font-normal text-slate-700">
              Payment Method:
            </p>
            <p className="font-bold">{data.payment_method}</p>
          </div>
          <div className="text-sm font-light text-slate-500">
            <p className="text-sm font-normal text-slate-700">Order For:</p>
            <p className="font-bold">
              {data && data?.delivery_date
                ? convertDate(data?.delivery_date)
                : null}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderhead;
