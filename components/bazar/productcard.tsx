import { variationsType } from "@/types/retail";
import { Search, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import Price from "../Price";

type Props = {
  image: string;
  title: string;
  max_price: string;
  min_price: string;
  age_restriction: boolean;
  variations_data: [variationsType];
};

export default function Productcard({
  image,
  variations_data,
  max_price,
  min_price,
  title,
}: Props) {
  return (
    <div className="w-48 md:w-56 cursor-pointer bg-white rounded-2xl duration-500 hover:shadow-2xl">
      <div className=" h-48 md:h-52 w-48 md:w-56 relative group">
        {image && (
          <Image
            width={1000}
            height={1000}
            src={image}
            alt="Product"
            className="h-full w-full object-cover p-2 rounded-2xl"
          />
        )}
        <div className="absolute bottom-0 w-full gap-2 rounded-lg">
          <div className="flex justify-center m-2 p-2 items-center">
            {variations_data &&
              variations_data
                .filter((v) => v.name === "Size")
                .map((v, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex gap-x-2">
                      {v.available_variations.map((av, idxx) => (
                        <p
                          key={idxx}
                          className={
                            "text-[10px] bg-gray-200 group-hover:bg-white text-red-600 font-bold text-center tracking-tight rounded-full p-1 w-6 h-6"
                          }
                        >
                          {av.name}
                        </p>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
          </div>
        </div>

        <div className="group-hover:slide-in absolute gap-2 rounded-lg m-2 p-2 inset-0 flex flex-col items-end justify-start bg-slate-900 bg-opacity-[0.4] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"></div>
      </div>
      <div className="px-4 py-3 w-48">
        <p className="text-lg  text-black hover:text-brand line-clamp-2 text-center block capitalize">
          {title}
        </p>
        <div className="flex justify-center">
          {min_price === max_price ? (
            <p className="text-sm text-red-500 font-bold cursor-auto my-3">
              <Price amount={min_price ? min_price : "00.00"} />
            </p>
          ) : (
            <p className="text-sm text-red-500 font-bold cursor-auto my-3">
              <Price amount={min_price ? min_price : "00.00"} /> - Rs.
              <Price amount={max_price ? max_price : "00.00"} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
