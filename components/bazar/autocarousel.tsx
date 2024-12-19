"use client";
import * as React from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface autocarouseltype {
  image: string;
}
type props = {
  array: autocarouseltype[];
};

export function AutoCarousel({ array }: props) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        // @ts-ignore
        AutoScroll({
          stopOnInteraction: true,
          stopOnFocusIn: true,
          stopOnMouseEnter: false,
          playOnInit: true,
        }),
      ]}
      className="w-full  mx-auto"
    >
      <CarouselContent>
        {array.map((content, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 lg:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center px-4">
                  <div className="bg-white h-12 flex hover:shadow-lg items-center justify-center">
                    <Image
                      height={1000}
                      width={1000}
                      className="object-contain w-full h-6 mx-auto"
                      src={content.image}
                      alt=""
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
