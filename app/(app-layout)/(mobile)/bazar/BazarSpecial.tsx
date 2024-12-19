import { Section } from "@/components/mainlanding/BazarSection";
import { encodeFiltersToURLSafe } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BazarSpecialProps {
  contents: Section | undefined;
}

const BazarSpecial = ({ contents }: BazarSpecialProps) => {
  if (!contents) return null;
  return (
    <section>
      <h4 className="uppercase text-3xl font-semibold text-center">
        Moments of <span className="text-brand">joy</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {contents.content.map((special, index) => (
          <Link
            key={`special-banner-${index}`}
            href={`/bazar/products${
              !!special?.category_group_detail?.category &&
              special?.category_group_detail?.category.length > 0
                ? "?dqs=" +
                  encodeFiltersToURLSafe(
                    special?.category_group_detail?.category
                      .map((cat) => `subcategory=${cat}`)
                      .join("&") ?? ""
                  )
                : ""
            }`}
            className="w-full"
          >
            <Image
              src={special.image}
              alt="special-banner"
              width={540}
              height={300}
              className="w-full rounded-2xl my-4"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BazarSpecial;
