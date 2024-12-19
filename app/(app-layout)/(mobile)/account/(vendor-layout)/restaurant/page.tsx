"use client";
import { Skeleton } from "@/components/ui/Skeleton";
import { VendorProfile } from "@/components/vendor/VendorProfileSection";
import useUser from "@/lib/useUser";
import axios from "axios";
import { Globe, Mail, MapPin, User, MapPinned, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

export default function RestaurantPage() {
  const { user } = useUser();
  const router = useRouter();
  const { data, isLoading: profileImageLoader } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/${user?.vendor_id}/`
      );
      return response.data as VendorProfile;
    },
    queryKey: [`vendor-profile-${user?.vendor_id}`],
    onError: (error) => {
      console.log("Cannot get the profile error", error);
    },
  });

  if (profileImageLoader) return <Skeleton className="w-full h-[270px]" />;
  if (!user) return router.push("/sign-in");
  if (user?.role !== 1 || user?.vendor_type !== 1) return notFound();
  return (
    data &&
    user && (
      // <div>
      //   <div className="mx-auto max-w-7xl">
      //     <h1 className="text-2xl font-semibold text-gray-900">My Restaurants</h1>
      //   </div>
      //   {/* ts-ignore */}
      //   {data && (
      //     <div
      //       className="font-sans mt-4 rounded-xl antialiased text-slate-700 leading-normal tracking-wider bg-cover"
      //       style={{
      //         backgroundImage: `url("${user?.cover_photo}")`,
      //       }}
      //     >
      //       <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      //         <div
      //           id="profile"
      //           className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none  bg-white opacity-75 mx-6 lg:mx-0"
      //         >
      //           <div className="p-4 md:p-12 text-center lg:text-left">
      //             <div
      //               className="block lg:hidden rounded-full bg-slate-200 p-2  mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
      //               style={{
      //                 backgroundImage: `url(${data.vendor_logo})`,
      //               }}
      //             ></div>

      //             <h1 className="text-xl font-bold pt-8 lg:pt-0">
      //               {data?.vendor_name}
      //             </h1>
      //             <h1 className="text-md font-semibold pt-8 capitalize lg:pt-0">
      //               Owner: {user?.first_name}
      //             </h1>
      //             <h1 className="text-md font-semibold pt-2 lg:pt-0">
      //               Member Since: {data?.created_at.split("T")[0]}
      //             </h1>
      //             <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-orange-500 opacity-25"></div>
      //             <p className="pt-4 text-base font-bold gap-4 flex items-center justify-center lg:justify-start">
      //               <MapPin className="h-6  w-6 fill-brand text-white" />
      //               Your Address - {user?.city} - {user?.country}
      //             </p>
      //             <p className="pt-2 text-gray-600 gap-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
      //               <Globe className="h-6  w-6 text-brand fill-white" />
      //               Your Location - {data?.vendor_location_latitude}° Lat,
      //               {data?.vendor_location_longitude}° Lon
      //             </p>
      //             <p className="pt-8 text-lg mx-auto lg:mx-0 w-4/5 font-bold border-b-[1px] border-brand border-dotted">
      //               More Details
      //             </p>

      //             <p className="pt-2 text-gray-600 gap-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
      //               Tax Rate - {data?.tax_rate}
      //             </p>
      //             <p className="pt-2 text-gray-600 gap-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
      //               Age Restriction- {data?.age_restriction ? "Yes" : "No"}
      //             </p>

      //             <div className="pt-12 pb-8">
      //               <button
      //                 onClick={() => router.push("/settings")}
      //                 className="bg-brand hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
      //               >
      //                 View My Settings
      //               </button>
      //             </div>
      //           </div>
      //         </div>

      //         {/* <div className="w-full lg:w-2/5">
      //           <Image
      //             alt={data?.vendor_name}
      //             height={1000}
      //             width={1000}
      //             src={
      //               data?.vendor_cover_image
      //                 ? data?.vendor_cover_image
      //                 : "./pattern.jpg"
      //             }
      //             className="rounded-none min-h-[500px] max-h-screen object-cover bg-center lg:rounded-lg shadow-2xl hidden lg:block"
      //           />
      //         </div> */}
      //       </div>
      //     </div>
      //   )}
      // </div>
      <div className="max-w-screen-xl mx-auto p-5  font-[sans-serif]">
        <div
          style={{
            backgroundImage: `url("${user?.cover_photo}")`,
          }}
          className=" bg-top bg-no-repeat bg-cover opacity-[5] rounded-lg overflow-hidden h-72 w-full"
        >
          <div className="h-full w-full bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-xl lg:text-3xl">
              {data?.vendor_name}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-md border">
          <div className="bg-slate-100 rounded-md  md:col-span-4 p-10 text-black">
            <h3 className="text-xl text-black sm:text-2xl leading-normal my-2 font-extrabold tracking-tight">
              {data?.vendor_name}
            </h3>
            <p className={"font-light text-sm"}>
              Member Since:- {data?.created_at.split("T")[0]}
            </p>
            <div className="flex items-center mt-5">
              <User className="h-6 mr-2 text-black" />
              <p title="Current User" className="text-sm">
                {user?.first_name + " " + user?.last_name}
              </p>
            </div>
            <div className="flex items-center mt-5">
              <p className="h-6 w-6 text-[10px] font-bold mr-2 p-0.5 rounded-full border-2 text-black border-black text-center">
                18+
              </p>
              <p title="Age Restrictions" className="text-sm">
                {data?.age_restriction ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center mt-5">
              <p className="h-6 w-6 text-[8px] font-extrabold mr-2 p-0.5 rounded-sm border-2 text-black border-black text-center">
                TAX
              </p>
              <p title="Age Restrictions" className="text-sm">
                {data?.tax_rate}%
              </p>
            </div>
            <div className="flex items-center mt-5">
              <MapPinned className="h-6 mr-2 text-black" />
              <Link
                title={`${data?.vendor_name} Location`}
                className="text-sm line-clamp-1"
                href={
                  data?.vendor_location_latitude &&
                  data?.vendor_location_longitude
                    ? `/locations?lat=${data?.vendor_location_latitude}&lng=${data?.vendor_location_longitude}`
                    : ""
                }
              >
                {data?.vendor_location}
              </Link>
            </div>
            <div className="py-8">
              <button
                onClick={() => router.push("/settings")}
                className="bg-brand hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
              >
                View My Settings
              </button>
            </div>
          </div>
          <div className="md:col-span-8 p-10">
            <h1 className="font-bold text-xl text-black">Restaurant License</h1>
            {!!data.vendor_license && (
              <Image
                src={data.vendor_license}
                alt={data.vendor_name + "'s license"}
                width={1000}
                height={1000}
                className={
                  "w-full h-full max-h-[50vh] aspect-square object-center object-cover border-2 border-dotted"
                }
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}
