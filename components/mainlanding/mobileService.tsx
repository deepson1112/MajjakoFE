import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeatureProps {
  image: string;
  title: string;
  link: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1598515213381-80d77efcdf32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Food",
    link: "/marketplace",
    description: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bazar",
    link: "/bazar",
    description: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Rental",
    link: "/rental",
    description: "Comming Soon!!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Vacation",
    link: "/vacation",
    description: "Comming Soon!!",
  },
];

export default function MobileService() {
  return (
    <section className="w-full grid lg:hidden grid-cols-2 md:grid-cols-4 -mt-52 md:-mt-32 gap-2 place-content-center place-items-center px-4 md:px-6">
      {features.map((feature, index) => (
        <Link key={index} href={feature.link}>
          <figure
            className={cn(
              "relative w-40 md:w-44 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-white hover:bg-white/[.7]"
            )}
          >
            <div className="flex flex-row text-black items-center gap-2">
              <Image
                className="rounded-full h-8 w-8 object-cover bg-center"
                width={1000}
                height={1000}
                alt=""
                src={feature.image}
              />
              <div className="flex flex-col text-black">
                <figcaption className="text-md font-bold text-black">
                  {feature.title}
                </figcaption>
                <p className="text-[10px] md:text-xs font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          </figure>
        </Link>
      ))}
    </section>
  );
}
