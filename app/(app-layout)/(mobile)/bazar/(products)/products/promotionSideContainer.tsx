import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  image: string;
};

export default function PromotionSideContainer({ image, className }: Props) {
  return (
    <article
      className={clsx(
        "relative isolate flex flex-col justify-end overflow-hidden rounded-2xl mr-2 px-4 pb-8 max-w-sm  mt-4",
        className
      )}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">Paris</h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        City of love
      </div> */}
    </article>
  );
}
