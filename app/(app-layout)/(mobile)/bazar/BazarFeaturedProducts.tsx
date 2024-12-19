import { Section } from "@/components/mainlanding/BazarSection";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { encodeFiltersToURLSafe } from "@/lib/utils";

interface BazarFeaturedProductsProps {
  contents: Section | undefined;
}

const BazarFeaturedProducts = ({ contents }: BazarFeaturedProductsProps) => {
  if (!contents) return null;
  return (
    // <section className="py-6 w-full gap-x-6 lg:gap-x-10 grid grid-flow-col overflow-x-auto px-[30px]">
    //   {contents.content.map((list, index) => (
    // <div
    //   className="w-[440px] h-[205px]"
    //   key={`bazar-featured-product-${index}`}
    // >
    //   <Link
    //     className="h-full w-full"
    //     href={`/bazar/products?${list?.category_group_detail?.category
    //       .map((cat) => `subcategory=${cat}`)
    //       .join("&")}`}
    //   >
    //     <Image
    //       src={`${list.image}`}
    //       alt={`featured-${list.section_code}`}
    //       width={440}
    //       height={205}
    //       className="h-full w-full rounded-2xl"
    //     />
    //   </Link>
    // </div>
    //   ))}
    // </section>
    <Carousel
      className="w-full max-w-7xl mx-auto my-6"
      opts={{ dragFree: true }}
    >
      <CarouselContent className="px-4">
        {contents.content.map((list, index) => (
          <CarouselItem
            key={`bazar-featured-product-${index}`}
            className="pl-4 basis-[85%] md:basis-[45%] lg:basis-1/3"
          >
            <Link
              className="h-full w-full"
              href={`/bazar/products?dqs=${encodeFiltersToURLSafe(
                list?.category_group_detail?.category
                  .map((cat) => `subcategory=${cat}`)
                  .join("&") ?? ""
              )}`}
            >
              <Image
                src={`${list.image}`}
                alt={`featured-${list.section_code}`}
                width={440}
                height={205}
                className="h-full w-full rounded-2xl"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BazarFeaturedProducts;
