"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Productcard from "./productcard";
import { Card, CardContent } from "../ui/Card";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { RetailItems } from "@/types/retail";
import Link from "next/link";
type props = {
  is_new_arrival?: boolean;
  is_Mobile?: boolean;
};
interface DataItem {
  created_date: string;
}
export function CarouselProvider({ is_Mobile, is_new_arrival }: props) {
  const { data: retailItems, isLoading: retailItemsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/retail-products-display/")
        .json<RetailItems[]>();
      return response;
    },
    queryKey: ["retail-items"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const sortedRetailItems = React.useMemo(() => {
    if (is_new_arrival && retailItems) {
      //@ts-ignore
      return [...retailItems].sort((a: DataItem, b: DataItem) => {
        const dateA = new Date(a.created_date);
        const dateB = new Date(b.created_date);
        return dateB.getTime() - dateA.getTime();
      });
    }
    return retailItems;
  }, [is_new_arrival, retailItems]);
  return retailItemsLoader ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <div className="w-full no-visible-scrollbar grid grid-rows-2 grid-flow-col overflow-x-auto lg:grid-rows-none lg:grid-flow-row-dense lg:hidden  gap-y-4 gap-x-0 place-items-center ">
        {sortedRetailItems?.length &&
          sortedRetailItems.map((retailItem, idx) => (
            <Link key={idx} href={`/products/${retailItem.id}`}>
              <Productcard
                age_restriction={retailItem.age_restriction}
                variations_data={retailItem.variations_data}
                image={retailItem.default_image}
                max_price={retailItem.price_range.max_price}
                min_price={retailItem.price_range.min_price}
                title={retailItem.name}
              />
            </Link>
          ))}
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full hidden lg:block lg:max-w-[820px] xl:max-w-[1120px] 2xl:max-w-[1440px] mx-auto"
      >
        <CarouselContent>
          {sortedRetailItems?.length &&
            sortedRetailItems.map((retailItem) => (
              <CarouselItem
                key={retailItem.id}
                className="basis-1/2 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1">
                  <Card className="border-none">
                    <CardContent className="flex items-center justify-center p-0.5">
                      <Link href={`/products/${retailItem.id}`}>
                        <Productcard
                          age_restriction={retailItem.age_restriction}
                          variations_data={retailItem.variations_data}
                          image={retailItem.default_image}
                          max_price={retailItem.price_range.max_price}
                          min_price={retailItem.price_range.min_price}
                          title={retailItem.name}
                        />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </React.Fragment>
  );
}
