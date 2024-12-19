"use client";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProfileSchema } from "@/lib/validators/profilesteps";
import {
  StandaloneSearchBox,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import { SecondStepForm } from "@/app/(screen-layout)/(setup-profile)/profile-setup/SecondStepForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

const libraries: Libraries = ["places"];

interface PlaceAutoCompleteProps {
  form: UseFormReturn<ProfileSchema | SecondStepForm>;
}

const AutoPlaceHandler = ({ form }: PlaceAutoCompleteProps) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries,
  });

  const handleLocationChange = () => {
    if (inputRef.current) {
      const [place] = inputRef.current.getPlaces() || [];

      if (place) {
        const addressComponents = place.address_components;
        const placeId = place.place_id;
        const addressMap = {
          street_number: "",
          route: "",
          locality: "",
          administrative_area_level_1: "",
          country: "",
          postal_code: "",
        };

        addressComponents?.forEach((component) => {
          const types = component.types;
          const value = component.long_name;
          if (types.includes("locality")) addressMap.locality = value;
          if (types.includes("administrative_area_level_1"))
            addressMap.administrative_area_level_1 = value;
          if (types.includes("postal_code")) addressMap.postal_code = value;
        });

        const locationDetails = {
          city: addressMap.locality,
          address: place.formatted_address,
          state: addressMap.administrative_area_level_1,
          country: addressMap.country,
          pin_code: `${addressMap.postal_code}`,
          latitude: `${place?.geometry?.location?.lat()}`,
          longitude: `${place?.geometry?.location?.lng()}`,
          place_id: placeId,
        };
        form.setValue("vendor_city", locationDetails.city);
        form.setValue("vendor_pin_code", locationDetails.pin_code);
        form.setValue("vendor_location", locationDetails?.address || "");
        form.setValue("vendor_location_latitude", locationDetails.latitude);
        form.setValue("vendor_location_longitude", locationDetails.longitude);
        form.setValue("place_id", locationDetails.place_id!);
      }
    }
  };

  return (
    isLoaded && (
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handleLocationChange}
      >
        <FormField
          control={form?.control}
          name={"vendor_location"}
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
                    onInput={() => {
                      console.log("Hello OWlrd goshshh");
                      form.setValue("place_id", "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </StandaloneSearchBox>
    )
  );
};

export default AutoPlaceHandler;
