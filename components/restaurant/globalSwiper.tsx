"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
//@ts-ignore
import { Navigation, Mousewheel, Keyboard } from "swiper";
import { ReactNode } from "react";
interface GlobalSliceProps {
  children: ReactNode[];
  slidenumber: number[];
  spaceBetween?: number[];
  loop: boolean;
}
function GlobalSlice({
  children,
  slidenumber,
  spaceBetween,
  loop,
}: GlobalSliceProps) {
  return (
    <div className="relative">
      <Swiper
        cssMode={true}
        slidesPerView={slidenumber[0]}
        spaceBetween={spaceBetween && spaceBetween[0] ? spaceBetween[0] : 4}
        navigation={true}
        keyboard={true}
        initialSlide={0}
        mousewheel={true}
        slidesPerGroup={1}
        loop={loop}
        breakpoints={{
          640: {
            slidesPerView: slidenumber[1],
            spaceBetween: spaceBetween && spaceBetween[1] ? spaceBetween[1] : 8,
            slidesPerGroup: 1,
            loop: true,
          },
          768: {
            slidesPerView: slidenumber[2],
            spaceBetween: spaceBetween && spaceBetween[2] ? spaceBetween[2] : 8,
            slidesPerGroup: 1,
            loop: true,
          },
          1024: {
            slidesPerView: slidenumber[3],
            spaceBetween: spaceBetween && spaceBetween[3] ? spaceBetween[3] : 8,
            slidesPerGroup: 1,
            loop: true,
          },
          1280: {
            slidesPerView: slidenumber[4],
            spaceBetween: spaceBetween && spaceBetween[4] ? spaceBetween[4] : 8,
            slidesPerGroup: 1,
            loop: true,
          },
          1580: {
            slidesPerView: slidenumber[5],
            spaceBetween: spaceBetween && spaceBetween[5] ? spaceBetween[5] : 8,
            slidesPerGroup: 1,
            loop: true,
          },
        }}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="category-slider px-4 py-10"
      >
        {children &&
          children.map((child, index) => (
            <SwiperSlide key={index} className="group w-[260px] lg:w-[285px]">
              {child}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default GlobalSlice;
