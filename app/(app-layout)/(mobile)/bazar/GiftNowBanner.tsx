import { buttonVariants } from "@/components/ui/Button";
import React from "react";
import Link from "next/link";
import { cn, encodeFiltersToURLSafe } from "@/lib/utils";
import Image from "next/image";
import { Section } from "@/components/mainlanding/BazarSection";

interface GiftNowBannerProps {
  contents: Section | undefined;
}

const GiftNowBanner = ({ contents }: GiftNowBannerProps) => {
  if (!contents) return null;
  return (
    <section className="relative w-full h-[125px] md:h-[316px] rounded-3xl overflow-hidden py-6">
      <Image
        src={contents.content[0].image}
        alt="adf"
        className="-z-10 h-full w-full object-center object-cover absolute"
        fill
      />
      <div className="z-10 space-y-2 px-6 md:py-8 md:px-16">
        <div className="space-y-1">
          <h4 className="font-semibold text-base md:text-5xl uppercase max-w-2xl">
            {contents.content[0].title_text}
          </h4>
          <p className="text-gray-600 text-xs md:text-base">
            {contents.content[0].description}
          </p>
        </div>
        <Link
          href={`/bazar/products?dqs=${encodeFiltersToURLSafe(
            contents.content[0]?.category_group_detail?.category
              .map((cat) => `subcategory=${cat}`)
              .join("&") ?? ""
          )}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "md:rounded-full bg-slate-800 uppercase h-9 px-2 rounded-lg md:h-10 md:py-2 md:px-4"
          )}
        >
          <span className="text-xs">{contents.content[0].button_text}</span>
        </Link>
      </div>
    </section>
  );
};

export default GiftNowBanner;
