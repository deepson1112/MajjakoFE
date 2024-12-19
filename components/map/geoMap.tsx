"use client";

import Link from "next/link";
import { Icon } from "leaflet";
import { VendorDetails } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getResturantsData } from "@/app/(app-layout)/(mobile)/api/apiFetchServices";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { toast } from "sonner";

const GeoMap = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  //initial location is near Denver
  const initialCenter: [number, number] = [
    parseFloat(lat as string) || 39.72203663144919,
    parseFloat(lng as string) || -104.20754487387666,
  ];

  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    const storedLocation = sessionStorage.getItem("userLocation");
    if (storedLocation) {
      // setCenter(JSON.parse(storedLocation));
      router.push(
        `/locations?lat=${storedLocation[0]}&lng=${storedLocation[1]}`
      );
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const crd = position.coords;
            const userLocation: [number, number] = [
              crd.latitude,
              crd.longitude,
            ];
            // setCenter(userLocation);
            router.push(`/locations?lat=${crd.latitude}&lng=${crd.longitude}`);
            sessionStorage.setItem(
              "userLocation",
              JSON.stringify(userLocation)
            );
          },
          (error) => {
            console.error("Error fetching user location:", error);
            toast.error("Location Error", {
              description: `Unable to retrieve your location: ${error.message}`,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        toast.error("Geolocation not supported", {
          description: `Geolocation is not supported by this browser.`,
        });
      }
    }
  }, []);
  const MapViewUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom(), {
          animate: true,
          duration: 1.0,
        });
      }
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getResturantsData();
        setRestaurant(fetchedData);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        toast.error("Issue while fetching Vendor", {
          description: "Please Try Again",
        });
      }
    };

    fetchData();
  }, []);

  const markersRef = useRef(new Map<string, any>());

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      marker.openPopup();
    });
  }, [restaurant]);

  const homeIicon = new Icon({
    iconUrl: "./navigator.png",
    iconSize: [30, 30],
  });
  const locationIcon = new Icon({
    iconUrl: "./reslocation.png",
    iconSize: [30, 30],
  });

  return (
    <MapContainer
      zoom={100}
      dragging={false}
      zoomControl={true}
      preferCanvas={true}
      zoomAnimation={true}
      scrollWheelZoom={true}
      center={initialCenter}
      attributionControl={false}
      markerZoomAnimation={true}
      style={{ position: "sticky" }}
      className="w-full md:h-[calc(99vh-100px)] min-h-[492px] rounded-xl border-[1px]"
    >
      <MapViewUpdater center={initialCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        icon={locationIcon}
        position={{
          lat: initialCenter[0],
          lng: initialCenter[1],
        }}
      ></Marker>
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
                icon={homeIicon}
                position={{
                  lat: resLat,
                  lng: resLng,
                }}
                ref={(ref) => {
                  if (ref) {
                    markersRef.current.set(rest?.id.toString(), ref);
                  } else {
                    markersRef.current.delete(rest?.id.toString());
                  }
                }}
              >
                <Popup autoPan={false} autoClose={false}>
                  <Link href={`/menu/${rest?.id}`}>
                    <h1 className="font-bold text-brand text-lg">
                      {rest?.vendor_name}
                    </h1>
                    <button className="text-rose-500">
                      Click to view menu
                    </button>
                  </Link>
                </Popup>
              </Marker>
            );
          }
        })}
    </MapContainer>
  );
};

export default GeoMap;
// "use client";
// import Link from "next/link";
// import { Icon } from "leaflet";
// import { toast } from "../ui/use-toast";
// import { VendorDetails } from "@/types";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { getResturantsData } from "@/app/(app)/api/apiFetchServices";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// const GeoMap = () => {
//   const searchParams = useSearchParams();
//   const [center, setCenter] = useState<[number, number]>([
//     parseFloat(searchParams.get("lat") as string) || 39.72203663144919,
//     parseFloat(searchParams.get("lng") as string) || -104.20754487387666,
//   ]);

//   const [restaurant, setRestaurant] = useState<VendorDetails[]>([]);

//   const MapViewUpdater = ({ center }: { center: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//       if (center) {
//         map.setView(center, map.getZoom(), {
//           animate: true,
//           duration: 1.0,
//         });
//       }
//     }, [center, map]);
//     return null;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await getResturantsData();
//         setRestaurant(fetchedData);
//       } catch (error) {
//         toast({
//           title: "Issue while fetching Vendor",
//           description: "Please Try Again",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchData();
//   }, []);

//   const markersRef = useRef(new Map<string, any>());

//   useEffect(() => {
//     markersRef.current.forEach((marker) => {
//       marker.openPopup();
//     });
//   }, [restaurant]);

//   const homeIicon = new Icon({
//     iconUrl: "./navigator.png",
//     iconSize: [30, 30],
//   });
//   const locationIcon = new Icon({
//     iconUrl: "./reslocation.png",
//     iconSize: [30, 30],
//   });

//   return (
//     <MapContainer
//       zoom={6}
//       dragging={false}
//       zoomControl={true}
//       preferCanvas={true}
//       zoomAnimation={true}
//       scrollWheelZoom={true}
//       center={center}
//       attributionControl={false}
//       markerZoomAnimation={true}
//       style={{ position: "sticky" }}
//       className="w-full md:h-[calc(99vh-100px)] min-h-[492px] rounded-xl border-[1px]"
//     >
//       <MapViewUpdater center={center} />
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker
//         icon={locationIcon}
//         position={{
//           lat: center[0],
//           lng: center[1],
//         }}
//       ></Marker>
//       {!!restaurant &&
//         restaurant.map((rest: VendorDetails) => {
//           const resLat = parseFloat(
//             rest?.vendor_location_latitude as unknown as string
//           );
//           const resLng = parseFloat(
//             rest?.vendor_location_longitude as unknown as string
//           );
//           if (!isNaN(resLat) && !isNaN(resLng)) {
//             return (
//               <Marker
//                 key={rest?.id}
//                 icon={homeIicon}
//                 position={{
//                   lat: resLat,
//                   lng: resLng,
//                 }}
//                 ref={(ref) => {
//                   if (ref) {
//                     markersRef.current.set(rest?.id.toString(), ref);
//                   } else {
//                     markersRef.current.delete(rest?.id.toString());
//                   }
//                 }}
//               >
//                 <Popup autoPan={false} autoClose={false}>
//                   <Link href={`/menu/${rest?.id}`}>
//                     <h1 className="font-bold text-brand text-lg">
//                       {rest?.vendor_name}
//                     </h1>
//                     <button className="text-rose-500">
//                       Click to view menu
//                     </button>
//                   </Link>
//                 </Popup>
//               </Marker>
//             );
//           }
//         })}
//     </MapContainer>
//   );
// };

// export default GeoMap;
