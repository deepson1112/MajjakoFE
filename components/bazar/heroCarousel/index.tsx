"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import Slides from "@/components/bazar/heroCarousel/Slides";
import Controls from "@/components/bazar/heroCarousel/Controls";
import SlideInfo from "@/components/bazar/heroCarousel/SlideInfo";
import BackgroundImage from "@/components/bazar/heroCarousel/BackgroundImage";

export type Data = {
  img: string;
  title: string;
  description: string;
  category: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

export default function HomePage() {
  const [data, setData] = React.useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<Data>(
    sliderData[0]
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    <main
      className={`
        relative min-h-screen select-none overflow-hidden text-white antialiased`}
    >
      <AnimatePresence>
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div className="  absolute z-0  h-full w-full">
          <div className=" flex h-full w-full grid-cols-10 flex-col md:grid">
            <div className=" col-span-4 mb-3 flex h-full flex-1 flex-col justify-end -mt-52 md:mt-0 px-5 md:mb-0 md:justify-center md:px-10">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
            </div>
            <div className="col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10">
              <Slides data={data} />
              <Controls
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={initData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlideData}
                sliderData={sliderData}
              />
            </div>
          </div>
        </div>
      </AnimatePresence>
    </main>
  );
}

const sliderData = [
  {
    img: "/carousel/1.jpg",
    category: "Electronics",
    description:
      "Discover the latest in electronic & smart appliance technology with our wide range of products.",
    title: "Smart Phones",
  },
  {
    img: "/carousel/2.jpg",
    category: "Fashion",
    description:
      "Stay trendy with our latest collection of clothing and accessories for all seasons.",
    title: "Summer Collection",
  },
  {
    img: "/carousel/3.jpg",
    category: "Home & Kitchen",
    description:
      "Upgrade your home with our range of modern and stylish kitchen appliances and home decor.",
    title: "Modern Kitchen",
  },
  {
    img: "/carousel/4.jpg",
    category: "Sports & Outdoors",
    description:
      "Gear up for your next adventure with our top-quality outdoor and sports equipment.",
    title: "Camping Gear",
  },
  {
    img: "/carousel/7.jpg",
    category: "Beauty & Health",
    description:
      "Explore our extensive selection of beauty and health products to enhance your daily routine.",
    title: "Skincare Essentials",
  },
];

const initData = sliderData[0];
