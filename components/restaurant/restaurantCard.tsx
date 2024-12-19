import { Timer, Bike, Clock9 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  is_closed: boolean;
  id: number;
  image: string | null;
  restaurant_name: string | null;
  restaurant_logo: string | null;
  location: string | null;
  distance: string | null;
};

function RestaurantCard({
  is_closed,
  image,
  id,
  restaurant_name,
  location,
  distance,
  restaurant_logo,
}: Props) {
  return (
    <div className="w-[295px] bg-white border-b-[0.5px] mb-4 border-zinc-50 rounded-2xl hover:shadow-lg">
      <Link href={`/menu/${id}`}>
        <div className="w-full relative">
          <div>
            <div
              className={`h-[120px] w-[295px] rounded-t-2xl rounded-b-md relative ${
                is_closed
                  ? "filter brightness-[0.60] contrast-80"
                  : "brightness-[0.97]"
              } `}
              style={{
                backgroundImage: `url(${image ? image : "/pattern.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {distance && (
                <div className="text-center bg-zinc-50 text-orange-500 font-firasans text-xs absolute bottom-0 right-0 px-2 py-1 mx-2 rounded-t-xl ">
                  <div className="flex items-center font-bold">
                    {is_closed ? "Closed" : "Open Now"}
                  </div>
                </div>
              )}
              <Image
                alt={restaurant_name ? restaurant_name : ""}
                height={800}
                width={800}
                className="absolute bg-slate-50 object-cover rounded-xl h-20 bottom-0 p-1 left-1/2 transform -translate-x-1/2 -mb-5 w-20"
                src={restaurant_logo ? restaurant_logo : "/pattern.jpg"}
              />
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-md font-bold text-center text-gray-800 truncate capitalize">
              {restaurant_name}
            </p>
            <p className=" text-gray-400 line-clamp-1 capitalize tracking-wider text-center text-xs font-bold pt-2">
              {location}
            </p>
          </div>
          <div className="flex flex-row gap-x-6 justify-evenly mt-[-10px] pb-2 ">
            <div className="flex items-start gap-x-2 ">
              <Bike className="text-orange-500 h-5 w-5" />
              <p className="text-gray-700 text-sm font-semibold">Free</p>
            </div>
            <div className=" flex gap-x-2 justify-end">
              <Clock9 className="text-orange-500 h-5 w-5" />
              <p className="text-gray-700 text-sm font-semibold">20-30 min</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
