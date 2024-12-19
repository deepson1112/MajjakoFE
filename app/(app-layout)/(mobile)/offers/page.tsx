export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getResturantsJSONData } from "../api/apiFetchServices";
import { VendorDetails } from "@/types";
import ItemsCard from "@/components/restaurant/card";

export const metadata: Metadata = {
  title: "Majjakodeals | Offers",
  description: "Online food ordering application",
};
interface Restaurant extends VendorDetails {
  store_offer: {
    discount_percentages: number;
    offer_name: string;
    active: boolean;
    discount_banner: string;
  }[];
}
const Storeoffers = async () => {
  const data: Restaurant[] = await getResturantsJSONData();
  return (
    <div className="w-full px-2 md:px-16">
      <section className="w-full mx-auto max-w-[1200px] py-20 no-visible-scrollbar gap-8 lg:gap-x-16 grid grid-col-1  md:grid-rows-none md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {data &&
          data.map(
            (x, i) =>
              x?.store_offer.length > 0 &&
              x?.store_offer[0].active && (
                <ItemsCard
                  key={i}
                  title={x?.vendor_name}
                  tag_offer={`${x?.store_offer[0].discount_percentages}% off ${x?.store_offer[0]?.offer_name}`}
                  bottom_offer="$0 delivery fee, first order"
                  image={`${process.env.NEXT_PUBLIC_BASE_URL}${
                    x?.store_offer[0]?.discount_banner
                      ? "/" + x?.store_offer[0]?.discount_banner
                      : "/pattern.jpg"
                  }`}
                  distance="30 Miles away"
                  time="20-30 Min"
                  location={x?.vendor_location}
                  link={`/menu/${x?.id}`}
                  restaurant_name={x?.vendor_name}
                />
              )
          )}
      </section>
    </div>
  );
};

export default Storeoffers;
