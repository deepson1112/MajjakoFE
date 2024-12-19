"use client";

import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import BazarSvg from "@/public/Landing/Bazar.svg";
import FoodDeliverySvg from "@/public//Landing/Food-Delivery.svg";
import RentalSvg from "@/public//Landing/Rental.svg";
import VacationSvg from "@/public//Landing/Vacation.svg";
import MobileSearch from "./MobileSearch";
import { Suspense, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import GlobalMobileSearch from "../ui/GlobalMobileSearch";

export const LandingHeroNavigations = [
  {
    name: "Bazar",
    herf: "/bazar/products/",
    content: "Shop Now",
    img: "/Landing/Bazar.svg",
    top: "30",
    svg: BazarSvg,
  },
  {
    name: "Food Delivery",
    herf: "/restaurant",
    content: "Order Now",
    img: "/Landing/Food-Delivery.svg",
    top: "40",
    svg: FoodDeliverySvg,
  },

  {
    name: "Rental",
    herf: "/",
    content: "Rent Now",
    img: "/Landing/Rental.svg",
    top: "20",
    svg: RentalSvg,
  },
  {
    name: "Vacation",
    herf: "/",
    content: "Book Now",
    img: "/Landing/Vacation.svg",
    top: "30",
    svg: VacationSvg,
  },
];

export const StartSellingContents = [
  {
    title: "Register",
    content: "Sign up by providing your business details to get started.",
    img: "/Landing/mobile/register.svg",
  },
  {
    title: "Set Up Shop",
    content: "Add your products and set up your online store easily.",
    img: "/Landing/mobile/setup.svg",
  },
  {
    title: "Start Selling",
    content:
      "Publish your store and start selling to our extensive customer base.",
    img: "/Landing/mobile/selling.svg",
  },
  {
    title: "Earn Money",
    content: "Track your sales and watch your profits grow with Majjakodeals.",
    img: "/Landing/mobile/money.svg",
  },
];

const LandingFeatures = [
  [
    {
      title: "Food Delivery",
      content: "Discover Local Stores based on your GPS location",
    },
    {
      title: "Vendors",
      content: "Discover Local Stores based on your GPS location",
    },
    {
      title: "Bazar",
      content: "Discover Local Stores based on your GPS location",
    },
  ],
  [
    {
      title: "Rental",
      content: "Discover Local Stores based on your GPS location",
    },
    {
      title: "Vacation",
      content: "Discover Local Stores based on your GPS location",
    },
    {
      title: "Manty More",
      content: "Discover Local Stores based on your GPS location",
    },
  ],
];

const LandingHeader = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  console.log("Is Bisislbe", isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  return (
    <>
      <div className="bg-brand">
        <MaxWidthWrapper className="py-6 hidden md:block">
          <main className="md:flex items-center gap-2 bg-brand">
            <div className="text-white flex flex-col items-center md:items-start text-center md:text-left flex-1 space-y-4">
              <h2 className="font-black text-5xl uppercase tracking-wide leading-[1.15]">
                <span>Quick &</span> <br />
                Easy Orders <br />
                Majjako Deals
              </h2>
              <p className="text-xs md:text-sm lg:text-base">
                Enjoy quick and easy online food ordering with Majjakodeals
                simple, intutive, and efficient platform.
              </p>
              <div className="flex items-center space-x-6">
                <Link
                  href={"/bazar"}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "bg-white text-brand hover:bg-gray-100 hover:text-brand"
                  )}
                >
                  Get Started
                </Link>
                <Link
                  href={"/bazar/products"}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "group hover:bg-white font-medium text-white hover:text-brand"
                  )}
                >
                  <span className="rounded-full p-2 text-white  font-semibold">
                    <div className="bg-white h-8 w-8 rounded-full text-brand flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 " />{" "}
                    </div>
                  </span>
                  Order Now
                </Link>
              </div>
            </div>

            <div className="md:max-w-sm lg:max-w-xl">
              <video className="w-full h-full" muted autoPlay loop>
                <source src="/Main.webm" type="video/mp4" />
              </video>
            </div>
          </main>
        </MaxWidthWrapper>
      </div>

      <div className="w-full bg-brand" ref={sectionRef}>
        <div className="mx-auto max-w-7xl w-full md:px-6 lg:px-8 relative pb-4 block md:hidden">
          <div className=" min-h-[75vh] top-0 left-0 w-full">
            <section className=" w-full md:my-12 md:pt-11 pt-1 min-h-[75vh] md:min-h-fit flex items-center justify-center">
              <div className="flex flex-col md:items-stretch items-center space-y-10 w-full">
                <Image
                  className="aspect-square w-44 block md:hidden -mt-24 z-10"
                  src="/final-white.svg"
                  alt="majjakodeals logo"
                  width={500}
                  height={500}
                />

                <Image
                  className="absolute left-0 bottom-0 aspect-square w-72 block md:hidden -mt-24"
                  src="/doodle-bottom.svg"
                  alt="doodle bottom svg"
                  width={500}
                  height={500}
                />

                <Image
                  className="absolute right-0 -top-12 aspect-square w-72 block md:hidden -mt-24"
                  src="/doodle-top.svg"
                  alt="doodle top svg"
                  width={500}
                  height={500}
                />
                <Suspense
                  fallback={
                    <Skeleton className="w-full h-[40px] rounded-full" />
                  }
                >
                  <MobileSearch isNotification={!isVisible} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
