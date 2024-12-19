"use client";

import React, { useCallback, useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { Input } from "@/components/ui/Input";
import { AddressReturnValue } from "@/types";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

const libraries: string[] = ["places"];

const OrderLocationAutoComplete = ({
  onPlaceSelect,
  defaultAddress,
  form,
  field,
}: {
  onPlaceSelect: (locationDetails: AddressReturnValue) => void;
  defaultAddress: string;
  form?: UseFormReturn<any>;
  field: string;
}) => {
  // const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const searchBoxRef = useRef<google.maps.places.SearchBox>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    // @ts-ignore
    libraries,
  });

  const handlePlacesChanged = useCallback(() => {
    const searchBox = searchBoxRef.current;

    const places = searchBox?.getPlaces();

    if (places && places.length > 0) {
      const place = places[0];

      if (place) {
        const addressComponents = place.address_components;
        const addressMap = {
          street_number: "",
          route: "",
          locality: "",
          administrative_area_level_1: "", // state
          country: "",
          postal_code: "",
        };

        addressComponents?.forEach((component) => {
          const types = component.types;
          const value = component.long_name;
          if (types.includes("street_number")) addressMap.street_number = value;
          if (types.includes("route")) addressMap.route = value;
          if (types.includes("locality")) addressMap.locality = value;
          if (types.includes("administrative_area_level_1"))
            addressMap.administrative_area_level_1 = value;
          if (types.includes("country")) addressMap.country = value;
          if (types.includes("postal_code")) addressMap.postal_code = value;
        });

        const locationDetails = {
          city: addressMap.locality,
          address: place.formatted_address,
          state: addressMap.administrative_area_level_1,
          country: addressMap.country,
          pin_code: `${addressMap.postal_code}`,
          latitude: `${place?.geometry?.location?.lat()!}`,
          longitude: `${place?.geometry?.location?.lng()!}`,
        };
        // @ts-ignore
        onPlaceSelect(locationDetails);
      }
    } else {
      console.log("No places found.");
    }
  }, [onPlaceSelect]);

  return (
    isLoaded && (
      // <div className="relative">
      <div
        className={"h-full w-full"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <StandaloneSearchBox
          // @ts-ignore
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <FormField
            control={form?.control}
            name={field}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter your address"
                      className="bg-gray-100 border-none"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      autoComplete="one-time-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* <Input
            type="text"
            className="form-control bg-gray-100 border-none mt-3 "
            placeholder="Enter Address"
            onChange={(e) => {
              e.preventDefault();
            }}
            required
            defaultValue={
              !!defaultAddress && !!defaultAddress.length ? defaultAddress : ""
            }
          /> */}
        </StandaloneSearchBox>
      </div>
      // </div>
    )
  );
};

export default OrderLocationAutoComplete;
