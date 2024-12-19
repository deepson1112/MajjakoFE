"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import CarouselIndicator from "@/components/ui/CarouselIndicator";
import { Section } from "@/components/mainlanding/BazarSection";
import { encodeFiltersToURLSafe } from "@/lib/utils";

interface BazarOffersProps {
  contents: Section | undefined;
}

const BazarOffers = ({ contents }: BazarOffersProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!contents) return null;
  return (
    <div className="flex flex-col items-center">
      <Carousel
        className="w-full"
        // @ts-ignore
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent>
          <CarouselItem>
            <div>
              <Link href={"/"} className="block">
                <Image
                  height={1080}
                  width={1920}
                  alt={`/asdfs`}
                  src={"/hello.png"}
                  className="h-[120px] md:h-[316px] w-full object-cover object-center rounded-2xl"
                />
              </Link>
            </div>
          </CarouselItem>
          {contents.content.map((item, index) => (
            <CarouselItem key={index}>
              <div>
                <Link
                  href={
                    !!item.category_group_detail
                      ? `/bazar/products?dqs=${encodeFiltersToURLSafe(
                          item?.category_group_detail?.category
                            .map((cat) => `subcategory=${cat}`)
                            .join("&")
                        )}`
                      : !!item.platform_offer
                      ? `/bazar/sale/${item.platform_offer.id}/?offer=${item.platform_offer.offer_name}`
                      : "/"
                  }
                  className="block"
                >
                  <Image
                    height={1080}
                    width={1920}
                    alt={`${item?.section_code}`}
                    src={`${item?.image}`}
                    className="h-[120px] md:h-[316px] w-full object-cover object-center rounded-2xl"
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselIndicator count={count} current={current} />
    </div>
  );
};

export default BazarOffers;
