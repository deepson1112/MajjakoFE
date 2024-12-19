import { VendorCategoryType } from "@/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";
type Props = {
  name: string;
  id: string;
  image: string;
};

function CategoryCard({ name, id, image }: Props) {
  return (
    <div className="text-center cursor-pointer p-0.5 md:p-3 bg-zinc-50 rounded-lg">
      <Link href={id}>
        <div className=" p-2 mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md">
          <div className="box-border inline-block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 max-w-full">
            <Image src={image} height={1000} width={1000} alt={name} />
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <h3 className="text-sm w-[80px] text-gray-600 mt-2 truncate group-hover:text-orange-500">
            {name}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
