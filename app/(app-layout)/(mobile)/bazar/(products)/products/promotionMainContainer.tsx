import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function PromotionMainContainer({}: Props) {
  return (
    <div className="my-2">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-brand p-1 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
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
            <div className="w-full lg:w-auto">
              <Link
                className="block w-full lg:w-auto text-center rounded-md bg-transparent text-white underline py-2 px-4 text-sm font-medium"
                href="/bazar/products"
              >
                Explore Bazar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
