"use client";
import Link from "next/link";
import Image from "next/image";
import { VendorDetails } from "@/types";
import { Bike, Timer } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { getResturantsData } from "../api/apiFetchServices";
import GoogleMapComponent from "@/components/map/mapdynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Libraries,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { toast } from "sonner";

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const R = 3958.8;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const libraries: Libraries = ["places"];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const [restaurant, setRestaurant] = useState<VendorDetails[]>([]);
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries,
  });

  const handleLocationChange = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          router.push(
            `/locations?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}`
          );
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData: VendorDetails[] = await getResturantsData();
        if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
          const filteredData = fetchedData.filter((restaurant) => {
            const distance = haversineDistance(
              lat,
              lng,
              parseFloat(restaurant.vendor_location_latitude!),
              parseFloat(restaurant.vendor_location_longitude!)
            );
            return distance <= 5;
          });
          setRestaurant(filteredData);
        } else {
          setRestaurant(fetchedData);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching restaurant data:", error);
        toast.error("Issue while fetching Vendor", {
          description: "Please Try Again",
        });
      }
    };

    fetchData();
  }, [lat, lng]);

  return (
    <Suspense
      fallback={
        <p className="text-center text-brand font-bold text-lg ">
          Loading Map...
        </p>
      }
    >
      <div className="lg:h-[80vh] min-h-[500px] flex flex-col lg:flex-row mx-auto max-w-[1440px]">
        <div className="flex flex-col mt-8 lg:mt-4 px-4 h-[50vh] w-full lg:w-4/12 lg:h-full">
          {isLoaded && (
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handleLocationChange}
            >
              <Input
                type="text"
                required
                className=" mt-3 !focus:border-brand"
                placeholder="City State or Zip Code"
              />
            </StandaloneSearchBox>
          )}
          {!loading && restaurant.length < 1 ? (
            <div>
              <Image
                height={1000}
                width={1000}
                alt="notfound"
                src={"/norestaurant.jpg"}
                className="h-64 w-full bg-center my-4 object-cover"
              />
              <h1 className="text-center text-xl text-orange-800 my-4 font-semibold tracking-tighter uppercase">
                No Restaurants Found
              </h1>
              <p className="text-center text-slate-500">
                Find a Restaurants to order online, see a menu, and get info.
              </p>
            </div>
          ) : (
            <div className="w-full py-2 bg-green-400">
              <div className="max-w-6xl mx-auto">
                <p>
                  <span className="font-semibold px-2">
                    {restaurant.length}
                  </span>
                  Restaurants Found
                </p>
              </div>
            </div>
          )}
          <section className="w-full overflow-y-scroll no-visible-scrollbar my-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 place-items-center">
            {restaurant &&
              restaurant.map((x, index) => (
                <Link key={index} href={`menu/${x?.id}`}>
                  <div className="flex flex-row min-w-[300px] max-w-[380px] h-[100px] rounded-xl mx-1 p-2 bg-zinc-100">
                    <div className="w-1/3">
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
                          <Timer className="text-orange-500 h-4 w-4" />
                          <p className="text-gray-800 text-sm font-normal">
                            20-30 min
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </section>
        </div>

        <div className="w-full lg:w-8/12">
          <Suspense
            fallback={
              <p className="text-center text-brand font-bold text-lg ">
                Loading Map...
              </p>
            }
          >
            <GoogleMapComponent isLoaded={isLoaded} lat={lat} lng={lng} />
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}
