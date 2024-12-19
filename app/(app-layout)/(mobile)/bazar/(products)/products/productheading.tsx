import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Ref } from "react";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  showtext?: boolean;
  children?: React.ReactNode;
};

export default function ProductHeading({
  showtext,
  title,
  subtitle,
  href,
  children,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between my-1 border-b-[3px] border-gray-200/60">
        <h2 className="text-gray-600 font-semibold tracking-wider -mb-[0.2rem] pb-3 border-b-[3px] border-brand">
          {title + " "}
          <span className="text-brand">{subtitle + " "}</span>
        </h2>
        {href &&
          (showtext ? (
            <Link
              className="inline-flex items-center font-medium text-md"
              href={href}
            >
              {showtext ? "View All" : ""}
              <ChevronRight className="w-4 h-4 text-brand" />
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <span className="text-sm hidden md:inline-block">See All</span>
              <div className="space-x-2">
                <button className="rounded-full  p-2">
                  <ChevronLeft className="w-6 h-6 text-brand" />{" "}
                </button>
                <button className="rounded-full  p-2">
                  <ChevronRight className="w-6 h-6 text-brand" />{" "}
                </button>
              </div>
            </div>
          ))}
      </div>

      {children ? children : null}
    </div>
  );
}
