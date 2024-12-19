import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className=" grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Find Your Right Food And Right Restaurant
            </h2>
            <p className="text-gray-700 md:py-4 font-medium md:text-md/relaxed lg:text-base/relaxed xl:text-md/relaxed ">
              Our platform helps you and your team focus on what matters most -
              building great products. Automate your workflow, collaborate
              seamlessly, and scale with ease.Our platform helps you and your
              team focus on what matters most - building great products.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 group"
              prefetch={false}
            >
              Explore Restaurant
              <ArrowRight className="h-4 w-4 group-hover:animate-pulse mx-2" />
            </Link>
          </div>
        </div>
        <Image
          src="/register/user.png"
          width={600}
          height={400}
          alt="featured1"
          className="aspect-[3/2] overflow-hidden rounded-b-xl rounded-s-xl rounded-se-[25%] object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24 mt-6 md:mt-24">
        <div className="order-2 lg:order-1">
          <Image
            src="/register/user.png"
            width={600}
            height={400}
            alt="featured2"
            className="aspect-[3/2] overflow-hidden rounded-b-xl rounded-e-xl rounded-ss-[25%] object-cover object-center"
          />
        </div>
        <div className="grid gap-6 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Find Your Daily Needs in Our Trusted Platform
            </h2>
            <p className="text-gray-700 md:py-4 font-medium md:text-md/relaxed lg:text-base/relaxed xl:text-md/relaxed ">
              Our platform is designed to help you and your team move faster.
              Automate your workflows, collaborate seamlessly, and scale with
              ease.Our platform is designed to help you and your team move
              faster.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 group"
              prefetch={false}
            >
              Explore Bazar
              <ArrowRight className="h-4 w-4 group-hover:animate-pulse mx-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
