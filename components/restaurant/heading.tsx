import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeadingProps {
  title: string;
  className?: String;
  linkClassName?: String;
  link: String;
}

export default function Heading({
  className,
  title,
  link,
  linkClassName,
}: HeadingProps) {
  return (
    <div className="flex flex-row justify-between items-center text-center pt-4">
      <h1
        className={
          "font-bold px-2 md:px-20 text-lg capitalize text-gray-800 tracking-wider" +
          className
        }
      >
        {title}
      </h1>
      <Link
        className={
          "mx-4 flex font-bold text-sm tracking-wider text-black px-4 py-1 md:mx-16" +
          linkClassName
        }
        href={`${link}`}
      >
        See All
        <ChevronRight />
      </Link>
    </div>
  );
}
