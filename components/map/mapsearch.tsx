"use client";

import React, { useRef } from "react";
import {
  StandaloneSearchBox,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import { Input } from "../ui/Input";
import { useRouter } from "next/navigation";

const libraries: Libraries = ["places"];

const MapSearch: React.FC = () => {
  const router = useRouter();
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries,
    nonce: "map",
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

  return (
    isLoaded && (
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
    )
  );
};

export default MapSearch;
