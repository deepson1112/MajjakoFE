export const dynamic = "force-dynamic";

import React from "react";
import Heading from "./heading";
import RestaurantCard from "./restaurantCard";
import NewRestaurantCard from "./newRestaurantCard";
import { VendorDetails } from "@/types";
import {
  getResturantsJSONData,
  getResturantsOpeningData,
} from "@/app/(app-layout)/(mobile)/api/apiFetchServices";
import { EmblaMain } from "../carousel/index";
import CategoryCard from "./categoryCard";
import { category } from "@/lib/Constants";

interface Restaurant extends VendorDetails {
  store_offer: {
    discount_percentages: number;
    offer_name: string;
    active: boolean;
    discount_banner: string;
  }[];
}
export default async function Main() {
  const openinghr = await getResturantsOpeningData();
  const data: Restaurant[] = await getResturantsJSONData();

  return (
    <div className="bg-white mx-auto overflow-hidden max-w-[1600px]">
      <div className="w-full px-2 md:px-16">
        <section className="w-full no-visible-scrollbar gap-4 lg:gap-x-16 grid  grid-flow-col overflow-x-auto md:overflow-visible md:grid-flow-row-dense md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 place-items-center">
          {!!category &&
            category
              .slice(0, 8)
              .map((catagory, i) => (
                <CategoryCard
                  key={i}
                  id={catagory?.href}
                  name={catagory?.name}
                  image={
                    category[i % 10].image
                      ? category[i % 10].image
                      : "/pattern.jpg"
                  }
                />
              ))}
        </section>
      </div>
      <div className="w-full px-4 md:px-16">
        <EmblaMain />
      </div>

      <Heading title="New Restaurants" link={"/marketplace?new=true"} />
      {openinghr ? (
        <NewRestaurantCard openinghr={openinghr} data={data} />
      ) : null}
      <Heading title="Popular Restaurants" link={"/marketplace"} />
      <div className="w-full px-2 md:px-16">
        <section className="w-full no-visible-scrollbar mt-4 gap-4 lg:gap-x-16 grid grid-rows-2 grid-flow-col overflow-x-auto md:overflow-visible  md:grid-rows-none md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {data &&
            data.slice(0, 8).map((x, index) => {
              const is_closed = openinghr?.today.find((c) => c.vendor === x.id);
              return (
                <RestaurantCard
                  id={x?.id}
                  key={index}
                  distance="30"
                  is_closed={is_closed ? !!is_closed.is_closed : false}
                  location={x?.vendor_location}
                  restaurant_name={x?.vendor_name}
                  restaurant_logo={
                    x?.vendor_logo ? x?.vendor_logo : "/pattern.jpg"
                  }
                  image={
                    x?.vendor_cover_image
                      ? x?.vendor_cover_image
                      : "/pattern.jpg"
                  }
                />
              );
            })}
        </section>
      </div>
    </div>
  );
}
