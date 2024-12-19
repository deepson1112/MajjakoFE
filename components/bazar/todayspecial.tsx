import Image from "next/image";
import React from "react";

type Props = {
  image: string;
};

export default function Todayspecial({ image }: Props) {
  return (
    <div className="h-56 ripple-container relative group w-full md:w-[340px] lg:w-[420px] rounded-xl">
      <Image
        alt="offer"
        height={1000}
        width={1000}
        className="h-56 w-full md:w-[340px] lg:w-[420px] rounded-xl bg-center object-cover"
        src={image}
      />
    </div>
  );
}
