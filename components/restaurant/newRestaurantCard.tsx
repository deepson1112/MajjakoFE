import { Bike, Clock9 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { VendorDetails } from "@/types";
import Link from "next/link";
import { OpeningHrType } from "@/lib/validators/openinghrs";

type Props = {
  data: VendorDetails[];
  openinghr: { today: OpeningHrType[]; tomorrow: OpeningHrType[] };
};

interface DataItem {
  created_at: string;
}

async function NewRestaurantCard({ data, openinghr }: Props) {
  data &&
    data.sort((a: DataItem, b: DataItem) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="w-full py-1 px-2 md:px-16">
      {/* <GlobalSlice loop={true} slidenumber={[1, 2, 2, 3, 4, 4]}> */}
      <section className="w-full no-visible-scrollbar gap-4 lg:gap-x-16 grid grid-rows-2 grid-flow-col overflow-x-auto md:overflow-visible  md:grid-rows-none md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {data &&
          data.length &&
          data.slice(0, 8).map((x, i) => {
            const is_closed = openinghr?.today.find((c) => c.vendor === x.id);
            return (
              <Link key={i} href={`menu/${x?.id}`}>
                <div className="flex flex-row w-[285px] h-[100px] rounded-xl mx-1 p-2 bg-zinc-50 border-b-[0.5px] border-slate-100 hover:shadow-lg">
                  <div
                    className={`w-1/3 ${
                      is_closed?.is_closed
                        ? "filter brightness-[0.60] contrast-80"
                        : "brightness-[0.95]"
                    }`}
                  >
                    {is_closed?.is_closed && (
                      <div className="absolute bg-white font-semibold text-brand top-1 right-1 text-sm px-0.5 rounded-md ">
                        Closed
                      </div>
                    )}
                    <Image
                      height={1000}
                      width={1000}
                      className="h-full rounded-lg"
                      src={
                        x?.vendor_cover_image
                          ? x?.vendor_cover_image
                          : "/pattern.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-2/3 flex flex-col px-2">
                    <p className="text-lg font-bold text-center">
                      {x?.vendor_name}
                    </p>
                    <p className="text-md my-1 font-normal text-center truncate">
                      {x?.vendor_location}
                    </p>
                    <div className="flex my-1 flex-row gap-x-6 gap-y-2 justify-evenly place-self-end  ">
                      <div className="flex items-start gap-x-1 ">
                        <Bike className="text-orange-500 h-4 w-4" />
                        <p className="text-gray-800 text-sm font-normal">
                          Free
                        </p>
                      </div>
                      <div className=" flex gap-x-1 justify-end">
                        <Clock9 className="text-orange-500 h-4 w-4" />
                        <p className="text-gray-800 text-sm font-normal">
                          20-30 min
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        {/* </GlobalSlice> */}
      </section>
    </div>
  );
}

export default NewRestaurantCard;
