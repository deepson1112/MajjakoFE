import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Product, ProductVariation } from "@/types";

interface ProductVariantsCarouselProps {
  currentProduct: Product;
  currentVariation: ProductVariation;
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
  currentImage: string;
}

export function ProductVariantsCarousel({
  currentProduct,
  setCurrentImage,
  currentImage,
  currentVariation,
}: ProductVariantsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full py-4"
    >
      <CarouselContent className="p-2">
        <CarouselItem className="basis-[22%]">
          <div
            className={` rounded-md overflow-hidden outline outline-offset-2 hover:outline-gray-300  ${
              currentImage === currentProduct.default_image
                ? "outline-brand"
                : "outline-gray-100"
            }`}
          >
            <Image
              src={currentProduct.default_image}
              alt="product-image"
              width={1000}
              height={1000}
              className="max-w-[auto] w-28 aspect-[1/1] object-center object-contain"
              onClick={() => {
                console.log("THis is hello wolrd");
                setCurrentImage(`${currentProduct.default_image}`);
              }}
            />
          </div>
        </CarouselItem>

        {Array.from({ length: 4 }).map((_, imageIndex) =>
          !!currentProduct[`image_${imageIndex}` as "image_1"] ? (
            <CarouselItem
              key={`current-variatoin-image-${
                currentProduct[`image_${imageIndex}` as "image_1"]
              }`}
              className="basis-[22%]"
            >
              <div
                key={`current-variatoin-image-${
                  currentProduct[`image_${imageIndex}` as "image_1"]
                }`}
                onClick={() =>
                  setCurrentImage(
                    `${currentProduct[`image_${imageIndex}` as "image_1"]}`
                  )
                }
                className={`rounded-md overflow-hidden outline outline-offset-2 hover:outline-gray-300 ${
                  currentImage ===
                  currentProduct[`image_${imageIndex}` as "image_1"]
                    ? "outline-brand"
                    : "outline-gray-100"
                }`}
              >
                <Image
                  src={currentProduct[`image_${imageIndex}` as "image_1"] || ""}
                  alt="product-image"
                  width={1000}
                  height={1000}
                  className="max-w-[auto] w-28 aspect-[1/1] object-center object-cover"
                />
              </div>
            </CarouselItem>
          ) : null
        )}

        {currentVariation?.variations_image.map((img, imgIndex) =>
          !!img.image ? (
            <CarouselItem
              key={`current-variatoin-image-${imgIndex}`}
              className="basis-[22%]"
            >
              <div
                key={`current-variatoin-image-${imgIndex}`}
                onClick={() =>
                  setCurrentImage(`${img.image || img.default_image}`)
                }
                className={`rounded-md overflow-hidden outline outline-offset-2 hover:outline-gray-300 ${
                  currentImage === img.image
                    ? "outline-brand"
                    : "outline-gray-100"
                }`}
              >
                <Image
                  src={img?.image || img.default_image || ""}
                  alt="product-image"
                  width={1000}
                  height={1000}
                  className="max-w-[auto] w-28 aspect-[1/1] object-center object-cover"
                />
              </div>
            </CarouselItem>
          ) : null
        )}
      </CarouselContent>
      <CarouselPrevious
        className="-left-5 bg-black/60 text-white hover:bg-black/60"
        variant={"subtle"}
      />
      <CarouselNext
        className="-right-5 bg-black/60 text-white hover:bg-black/60"
        variant={"subtle"}
      />
    </Carousel>
  );
}
