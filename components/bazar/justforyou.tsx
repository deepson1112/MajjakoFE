"use client";
import { api } from "@/lib/fetcher";
import { RetailItems } from "@/types/retail";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Productcard from "./productcard";
import Link from "next/link";

type Props = {};

export default function Justforyou({}: Props) {
  const [shuffledRetailItems, setShuffledRetailItems] = useState<RetailItems[]>(
    []
  );

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
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

  useEffect(() => {
    if (retailItems) {
      setShuffledRetailItems(shuffleArray([...retailItems]));
    }
  }, [retailItems]);
  return !retailItemsLoader ? (
    shuffledRetailItems?.length &&
      shuffledRetailItems.map((retailItem, idx) => (
        <Link key={idx} href={`/products/${retailItem.id}`}>
          <Productcard
            age_restriction={retailItem.age_restriction}
            variations_data={retailItem.variations_data}
            image={retailItem.default_image}
            min_price={retailItem.price_range.min_price}
            max_price={retailItem.price_range.min_price}
            title={retailItem.name}
          />
        </Link>
      ))
  ) : (
    <p>Loading...</p>
  );
}
