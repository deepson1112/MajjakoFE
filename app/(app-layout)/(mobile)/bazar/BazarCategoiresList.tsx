import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Section } from "@/components/mainlanding/BazarSection";
import { encodeFiltersToURLSafe } from "@/lib/utils";

interface BazarCategoiresListsProps {
  contents: Section | undefined;
}

const BazarCategoiresList = ({ contents }: BazarCategoiresListsProps) => {
  if (!contents) return null;
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {contents.content.map((list, index) => (
        <Link
          href={`/bazar/products?dqs=${encodeFiltersToURLSafe(
            list?.category_group_detail?.category
              .map((cat) => `subcategory=${cat}`)
              .join("&") ?? ""
          )}`}
          key={`bazar-categoires-${index}`}
          className="group h-24 md:h-full rounded-xl md:rounded-3xl overflow-hidden relative cursor-pointer"
        >
          <Image
            src={list.image}
            alt={`categoirer-img-${list.section_code}`}
            width={72}
            height={72}
            className="w-full h-full object-cover object-center group-hover:scale-[1.1] duration-200"
          />
          <div className="bg-gradient-to-t from-brand to-white/0 text-black absolute bottom-0 w-full text-center">
            <h6 className="text-sm md:text-2xl font-semibold pt-10 pb-4 text-white">
              {list.title_text}
            </h6>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default BazarCategoiresList;
