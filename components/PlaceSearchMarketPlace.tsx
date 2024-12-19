"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Libraries,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button } from "./ui/Button";

const libraries: Libraries = ["places"];

interface VendorLocation {
  vendor_location: string;
  vendor_location_latitude: number;
  vendor_location_longitude: number;
}
type PageIdentifierProps = {
  is_retail?: boolean;
};

const PlaceComponent = ({ is_retail }: PageIdentifierProps) => {
  const router = useRouter();
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,

    libraries,
  });
  const handleRoute = (payload: VendorLocation) => {
    if (payload?.vendor_location) {
      is_retail
        ? router.push(`/bazar`)
        : router.push(
            `/marketplace?location=${payload?.vendor_location}&lat=${payload?.vendor_location_latitude}&lng=${payload?.vendor_location_longitude}`
          );
    }
  };

  const handleLocationChange = () => {
    if (inputRef.current) {
      const [place] = inputRef.current.getPlaces() || [];
      if (place) {
        const payload = {
          vendor_location: place.formatted_address || "",
          vendor_location_latitude: place?.geometry?.location?.lat() || 0,
          vendor_location_longitude: place?.geometry?.location?.lng() || 0,
        };
        handleRoute(payload);
      }
    }
  };

  return (
    isLoaded && (
      <form className="max-w-2xl w-full pl-4 mb-2">
        <div className="relative flex bg-white rounded-lg border border-gray-400 overflow-hidden shadow text-slate-900 items-center">
          <div className="flex-1 h-12">
            <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)}>
              <input
                type="text"
                required
                className=" w-full h-12 px-2 border"
                placeholder="Enter Your Delivery Address"
              />
            </StandaloneSearchBox>
          </div>
          <Button type="button" className="mr-1" onClick={handleLocationChange}>
            Get Started
          </Button>
        </div>
      </form>
    )
  );
};

export default PlaceComponent;
