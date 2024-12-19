import { Button, buttonVariants } from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cn, encodeFiltersToURLSafe } from "@/lib/utils";
import { Section } from "@/components/mainlanding/BazarSection";

interface OcassionsProps {
  contents: Section | undefined;
}

const Ocassions = ({ contents }: OcassionsProps) => {
  if (!contents) return null;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {contents.content.map((list, index) => (
        // <div
        //   key={`bazar-ocassions-${index}`}
        //   className="rounded-2xl overflow-hidden w-full flex relative"
        // >
        //   <Image
        //     src={list.image || ""}
        //     alt={`occasions-${list.section_code}`}
        //     width={342}
        //     height={223}
        //     className="h-ful w-full absolute top-0 left-0"
        //   />

        //   <div
        //     style={{ background: `radial-gradient(#fb8054, #ff4503)` }}
        //     className="flex-1 w-full flex items-center justify-center"
        //   >
        //     <div className="flex flex-col items-center gap-4">
        //       <h5 className="text-center uppercase font-semibold text-white text-base md:text-2xl tracking-wide">
        //         {list.title_text}
        //       </h5>
        //       <Link
        //         href={`/bazar/products?${list?.category_group_detail?.category
        //           .map((cat) => `subcategory=${cat}`)
        //           .join("&")}`}
        //         className={cn(
        //           buttonVariants({ variant: "default" }),
        //           "bg-white text-brand hover:text-white rounded-xl"
        //         )}
        //       >
        //         {list?.button_text ? list.button_text : "GIFT NOW"}
        //       </Link>
        //     </div>
        //   </div>
        // </div>

        <Link
          href={`/bazar/products?dqs=${encodeFiltersToURLSafe(
            list?.category_group_detail?.category
              .map((cat) => `subcategory=${cat}`)
              .join("&") ?? ""
          )}`}
          key={`bazar-ocassions-${index}`}
          className="rounded-2xl overflow-hidden w-full flex relative h-[140px]  md:h-[130px] lg:h-[225px] bg-no-repeat bg-center bg-cover"
          // style={{ backgroundImage: `url('${list.image}')` }}
        >
          <Image
            src={list.image || ""}
            alt={`occasions-${list.section_code}`}
            width={4784}
            height={2218}
            className="h-full w-full object-center absolute top-0 left-0"
          />
        </Link>
      ))}
    </section>
  );
};

export default Ocassions;
