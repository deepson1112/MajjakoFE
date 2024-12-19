"use client";

import React, { useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";

const libraries = ["places"] as any;

interface PlaceAutoCompleteProps {
  vendor_id: string;
  vendor_prev_location?: string | null | undefined;
}

interface GoogleAPiResponse {
  vendor_location: string | undefined;
  vendor_location_latitude: number | undefined;
  vendor_location_longitude: number | undefined;
}

const PlaceComponent = ({
  vendor_prev_location,
  vendor_id,
}: PlaceAutoCompleteProps) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,

    libraries,
  });

  const { mutate: addLocationFn, isLoading: addLocationLoader } = useMutation({
    mutationFn: async (data: GoogleAPiResponse) => {
      const response = await api()
        .patch(data, `/vendor/vendor/${vendor_id}/`)
        .json<GoogleAPiResponse>();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully addded location");
    },
    onError: (error: any) => {
      toast.error("Unable to add location", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleLocationChange = () => {
    if (inputRef.current) {
      const [place] = inputRef.current.getPlaces() || [];
      if (place) {
        const payload = {
          vendor_location: place.formatted_address || "",
          vendor_location_latitude: place?.geometry?.location?.lat() || 0,
          vendor_location_longitude: place?.geometry?.location?.lng() || 0,
        };
        addLocationFn(payload);
      }
    }
  };

  return (
    isLoaded && (
      <>
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          // onPlacesChanged={handlePlaceChanged}
        >
          <Input
            type="text"
            required
            className="form-control bg-gray-100 border-none mt-3"
            defaultValue={
              vendor_prev_location ? vendor_prev_location : undefined
            }
            placeholder={
              vendor_prev_location
                ? vendor_prev_location
                : "Enter Your Location"
            }
          />
        </StandaloneSearchBox>
        <Button
          type="button"
          onClick={handleLocationChange}
          isLoading={addLocationLoader}
          disabled={addLocationLoader}
        >
          Save
        </Button>
      </>
    )
  );
};

export default PlaceComponent;
