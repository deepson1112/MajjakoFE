import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  retailer: string;
};

export default function Brandcategory({ image, retailer }: Props) {
  return (
    <div className="w-full border relative group">
      <Image
        width={1000}
        height={1000}
        src={image}
        alt="Product"
        className="h-24 md:h-32 w-full bg-center rounded-lg object-cover"
      />
      <div className="flex justify-between px-2 md:px-6">
        <h1 className=" text-black text-lg font-extrabold py-4">{retailer}</h1>
        <ChevronRight className="h-10 w-10 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-125 bg-slate-100 p-2 -mt-6 rounded-full transition-all transform duration-300" />
      </div>
    </div>
  );
}
