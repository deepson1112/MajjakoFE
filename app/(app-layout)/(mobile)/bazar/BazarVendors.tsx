"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Vendor } from "@/components/mainlanding/BazarSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { encodeFiltersToURLSafe } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

interface BazarVendorsProps {
  retails: Vendor[];
}

const BazarVendors = ({ retails }: BazarVendorsProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      className="w-full my-6"
      // @ts-ignore
      plugins={[plugin.current]}
      opts={{ loop: true, dragFree: true }}
    >
      <div className="flex items-center justify-between my-1 border-b-[3px] border-gray-200/60">
        <h2 className="text-gray-600 font-semibold tracking-wider -mb-[0.2rem] pb-3 border-b-[3px] border-brand">
          Our <span className="text-brand"> Vendors</span>
        </h2>

        <div className="flex items-center gap-6 -mt-2">
          <div className="flex items-center justify-end gap-4">
            <CarouselPrevious className="static translate-x-0 translate-y-0 left text-brand">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="static translate-x-0 translate-y-0 text-brand">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </div>
      </div>
      <CarouselContent className="">
        {retails.map((retail, index) => (
          <CarouselItem
            key={`bazar-vendor-${index}`}
            className="pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <Link
              className="p-2 group relative"
              href={`/bazar/products?dqs=${encodeFiltersToURLSafe(
                "vendor=" + retail.id
              )}`}
            >
              <div className="shadow rounded-xl overflow-hidden flex flex-col">
                <picture className="h-64 w-full">
                  <Image
                    src={retail.vendor_cover_image}
                    alt="bazar-vendors"
                    width={1580}
                    height={1024}
                    className="w-full h-full object-center object-contain"
                  />
                </picture>
                <div className="p-4">
                  <h6 className="text-lg font-semibold ">
                    {retail.vendor_name}
                  </h6>
                  <div className="flex items-center gap-3 p-2">
                    {/* <span>2.1km</span> */}
                    <span className="flex items-center text-xs">
                      {retail.vendor_location}
                    </span>
                    {/* <span className="flex items-center">
                      <Star fill="#ff4500" stroke="" />
                      4.7
                    </span> */}
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BazarVendors;
