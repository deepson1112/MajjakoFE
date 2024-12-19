export const dynamic = "force-dynamic";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getResturantsData,
  getResturantsOpeningData,
} from "../api/apiFetchServices";
import { VendorDetails } from "@/types";
import { Fragment } from "react";
import { VendorProfile } from "@/components/vendor/VendorProfileSection";

export const metadata: Metadata = {
  title: "Majjakodeals | Marketplace",
  description: "Online food ordering application",
};

const MarketplacePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const data: VendorProfile[] = await getResturantsData();

  const openinghr = await getResturantsOpeningData();
  const params = searchParams ? searchParams : null;
  const searchedData =
    data &&
    params &&
    params?.location &&
    data.filter((item: VendorDetails) => {
      return item.vendor_location
        ?.toLowerCase()
        .includes(params?.location?.toString().toLowerCase()!);
    });
  params?.new &&
    data &&
    data.sort((a, b) => {
      const dateA = new Date(a.created_at) as any;
      const dateB = new Date(b.created_at) as any;

      return dateB - dateA;
    });
  return (
    <Fragment>
      <div className="w-full py-2 bg-green-400">
        <div className="max-w-6xl mx-auto">
          <p>
            <span className="font-semibold px-2">
              {params && params?.location
                ? searchedData?.length
                : data
                ? data.length
                : null}
            </span>
            Restaurants Found
          </p>
        </div>
      </div>
      <div className="min-h-screen flex justify-center items-center py-20">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
          {(searchedData && searchedData.length
            ? searchedData
            : data && data.length
            ? data
            : []
          ).map((restaurant: VendorDetails) => {
            console.log(restaurant);
            const is_closed = openinghr?.today.find(
              (c) => c.vendor === restaurant?.id!
            );
            const nextOpening = openinghr?.tomorrow.find(
              (c) => c.vendor === restaurant?.id!
            );
            return (
              // <RestaurantList {...list} key={list.id} />
              <div
                key={restaurant.id}
                className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
              >
                <div className="relative">
                  {/* {restaurant.vendor_cover_image ? (
                    <Image
                      className="w-full max-w-100 h-60 object-cover rounded-xl"
                      width={1080}
                      height={1080}
                      src={restaurant.vendor_cover_image}
                      alt="Colors"
                    />
                  ) : null} */}
                  {restaurant.vendor_cover_image ? (
                    <Image
                      src={restaurant.vendor_cover_image}
                      alt="food-image"
                      loading="lazy"
                      width={500}
                      height={500}
                      className="w-full max-w-100 h-60 object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="bg-gray-100 w-full max-w-100 h-60 object-cover rounded-t-xl grid place-items-center text-gray-400">
                      <ImageOff className="w-12 h-12" />
                    </div>
                  )}
                  <p
                    className={`absolute top-0 ${
                      is_closed?.is_closed
                        ? "text-white bg-brand"
                        : "bg-green-500 text-white"
                    } font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg`}
                  >
                    {is_closed?.is_closed
                      ? `Closed.
                          ${
                            nextOpening?.from_hour
                              ? `Opening at ${nextOpening.from_hour}`
                              : "Opening Soon"
                          }`
                      : "Open Now"}
                  </p>
                </div>
                <h1 className="mt-4 text-gray-800 text-xl font-semibold cursor-pointer">
                  {restaurant.vendor_name}
                </h1>
                <div className="my-4">
                  <div className="flex space-x-1 items-center mt-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {restaurant.vendor_location ? (
                      <p className="text-xs">{restaurant.vendor_location}</p>
                    ) : null}
                  </div>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "mt-4 w-full"
                    )}
                    href={`/menu/${restaurant.id}`}
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default MarketplacePage;
