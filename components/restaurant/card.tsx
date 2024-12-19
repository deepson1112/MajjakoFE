export const dynamic = "force-dynamic";

import Image from "next/image";
import React from "react";
import { Tag, UtensilsCrossed, Bike, Timer, Clock9 } from "lucide-react";
import Link from "next/link";
import { getVendorByID } from "@/app/(app-layout)/(mobile)/api/apiFetchServices";

interface ItemsCardProps {
  title: string;
  image: string;
  distance: string;
  time: string;
  location?: string | null;
  restaurant_name: string;
  tag_offer?: string;
  bottom_offer: string;
  closed?: Boolean;
  isCarousel?: Boolean;
  link: string;
  vendorid?: Number;
}
export default async function ItemsCard({
  title,
  image,
  distance,
  time,
  location,
  vendorid,
  tag_offer,
  restaurant_name,
  closed,
  link,
}: ItemsCardProps) {
  const vendor = vendorid && (await getVendorByID(vendorid?.toString()));
  return (
    <div className="relative bg-white my-3 cursor-pointer border-b-[0.5px] border-slate-100 rounded-xl">
      <Link href={link!}>
        <div className="relative w-[285px] lg:w-[285px] overflow-x-hidden rounded-t-xl">
          <Image
            className={`min-h-[100px] max-h-[120px] w-full rounded-xl ${
              closed ? "filter brightness-[0.35] contrast-80" : "brightness-90"
            }  object-cover `}
            alt={title}
            height={1000}
            width={1000}
            src={image}
          />

          {tag_offer && (
            <div
              className={`text-center ${
                closed ? "bg-white text-brand font-bold" : "bg-brand text-white"
              } font-firasans text-xs absolute top-2 left-2 px-6 py-1 rounded-md`}
            >
              <div className="flex items-center">
                {closed ? (
                  <Clock9 className="fill-orange-500 text-white h-4 w-4 mx-1" />
                ) : (
                  <Tag className="h-4 w-4 mr-2 rotate-90" />
                )}
                {closed
                  ? `Closed. ${time ? `Opening at ${time}` : "Opening Soon"}`
                  : tag_offer}
              </div>
            </div>
          )}
        </div>
        <div className="mb-2 mt-4 flex flex-row pl-2">
          <div className="px-2 flex-col ">
            <p className="flex text-sm font-bold text-gray-800 truncate capitalize">
              <span>
                <UtensilsCrossed className="text-orange-500 fill-orange-500 text-extrabold h-4 w-4 mr-4 mt-1" />
              </span>
              {title}
            </p>
            <p className="w-[170px] md:w-[200px] text-xs font-bold py-1 text-[#7A87A2] tracking-tight truncate capitalize">
              {vendor ? vendor?.vendor_name : restaurant_name}
              <span className="capitalize">
                . {vendor ? vendor?.vendor_location : location}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-evenly pb-2 place-self-end">
          <div className="flex items-start gap-x-2 ">
            <Bike className="text-orange-500 h-5 w-5" />
            <p className="text-gray-800 text-sm font-semibold">Free</p>
          </div>
          <div className=" flex gap-x-2 justify-end">
            <Clock9 className="text-orange-500  h-5 w-5" />
            <p className="text-gray-800 text-sm font-semibold">20-30 min</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
