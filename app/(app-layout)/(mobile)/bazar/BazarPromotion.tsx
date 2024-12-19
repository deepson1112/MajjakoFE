import { Section } from "@/components/mainlanding/BazarSection";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BazarPromotionProps {
  contents?: Section;
}

export default function BazarPromotion({ contents }: BazarPromotionProps) {
  return (
    <div className="my-2 hidden md:block">
      <div className="w-full">
        <div className="rounded-2xl bg-brand p-1 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-4xl mx-auto">
            <div className="flex items-center mb-4 lg:mb-0 lg:mr-4">
              <span className="flex rounded-lg bg-brand p-2">
                <Sparkles className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              </span>
              <p className="ml-3 font-medium text-white">
                <span className="inline">
                  Members get FREE DELIVERY for the first month of sign-up
                </span>
              </p>
            </div>
            <div className="w-full lg:w-auto flex items-center">
              <Link
                className="block w-full lg:w-auto text-center rounded-md bg-transparent text-white underline py-2 px-4 text-sm font-medium"
                href="/bazar/products"
              >
                Explore Product
              </Link>
              <span className="rounded-lg bg-brand p-2 hidden md:flex">
                <Sparkles className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
