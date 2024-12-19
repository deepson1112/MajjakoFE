import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  title: string;
  link: string;
  textclass: string;
};

export default function Collections({ image, title, link, textclass }: Props) {
  return (
    <section className="h-44 w-32 mx-auto flex justify-between items-center">
      <Link href={link}>
        <Image
          alt={title}
          height={1000}
          width={1000}
          className="h-32 w-32 transition transform duration-700 rounded-full"
          src={image}
        />
        <div className="w-full text-center py-4">
          <h1 className={cn("text-xl font-semibold capitalize ", textclass)}>
            {title}
          </h1>
        </div>
      </Link>
    </section>
  );
}
