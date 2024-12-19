"use client";
import axios from "axios";
import Link from "next/link";
import { VendorDetails } from "@/types";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { toast } from "sonner";

const containerStyle = {
  maxWidth: "100%",
  height: "100%",
  borderRadius: "1%",
};

const defaultCenter = {
  lat: 39.739235,
  lng: -104.99025,
};

interface GoogleMapComponentProps {
  isLoaded: boolean;
  lat?: number;
  lng?: number;
}

interface MarkerData {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  link: string;
}

function GoogleMapComponent({ isLoaded, lat, lng }: GoogleMapComponentProps) {
  const [restaurant, setRestaurant] = useState<VendorDetails[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<null | MarkerData>(null);

  useEffect(() => {
    if (lat && lng && mapRef.current) {
      const newCenter = {
        lat: parseFloat(lat.toString()),
        lng: parseFloat(lng.toString()),
      };
      mapRef.current.panTo(newCenter);
    }
  }, [lat, lng]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/`
        );
        setRestaurant(fetchedData.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        toast.error("Issue while fetching Vendor", {
          description: "Please Try Again",
        });
      }
    };

    fetchData();
  }, []);

  const onMapLoad = (mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
    if (lat && lng) {
      const newCenter = {
        lat: parseFloat(lat.toString()),
        lng: parseFloat(lng.toString()),
      };
      mapInstance.panTo(newCenter);
    }
  };

  return isLoaded ? (
    <div className="max-w-[90vw] h-[80vh] mx-auto rounded-xl">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        center={defaultCenter}
        onLoad={onMapLoad}
        options={{
          draggable: true,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          disableDefaultUI: false,
        }}
      >
        {!!restaurant &&
          restaurant.map((rest: VendorDetails) => {
            const resLat = parseFloat(
              rest?.vendor_location_latitude as unknown as string
            );
            const resLng = parseFloat(
              rest?.vendor_location_longitude as unknown as string
            );
            if (!isNaN(resLat) && !isNaN(resLng)) {
              return (
                <Marker
                  key={rest?.id}
                  position={{
                    lat: resLat,
                    lng: resLng,
                  }}
                  onClick={() =>
                    setSelectedMarker({
                      location: {
                        lat: resLat,
                        lng: resLng,
                      },
                      name: rest?.vendor_name || "Unknown Vendor",
                      link: `/menu/${rest?.id}`,
                    })
                  }
                />
              );
            }
          })}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.location}
            options={{ disableAutoPan: true }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <Link href={selectedMarker?.link}>
                <h1 className="text-brand font-bold text-md">
                  {selectedMarker.name}
                </h1>
                <p className="font-bold text-xs">Click To View Menu</p>
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className="h-full w-full pt-56 lg:pt-16 flex justify-center items-center">
      <p>Loading Map, Please Wait!!</p>
    </div>
  );
}

export default React.memo(GoogleMapComponent);
