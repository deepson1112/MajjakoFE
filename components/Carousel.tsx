"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
/* @ts-ignore */
import SwiperCore, { Autoplay, EffectCoverflow } from "swiper";
import Image from "next/image";

interface CarouselFields {
  image: string;
  offer: string;
}
type PropsTypes = {
  carouselarray: CarouselFields[];
};
/**
 *
 * Carousel designed to take a dynamic Images and Offers
 * @param carouselarray is an array of carouselfields
 * @param carouselfields is an object of image and offers
 * @returns Carousel View With Image as background and offer at left bottom
 */
function Carousel({ carouselarray }: PropsTypes) {
  SwiperCore.use([Autoplay]);
  return (
    <div className="container hidden lg:flex">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow]}
        className="swiper_container"
      >
        {carouselarray.map((content, index) => (
          <SwiperSlide key={index} className="relative">
            <Image
              src={content.image}
              width={1000}
              height={1000}
              loading="lazy"
              className="slider-img"
              alt="slide_image"
            />
            <figure className="bg-red-500 h-16 w-16 absolute left-4 bottom-4 rounded-full text-white font-semibold grid items-center">
              <span>{content.offer} off</span>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
