import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SectionHeaderProps {
  prefixText: string;
  highlightText: string;
  href?: string;
}

const SectionHeader = ({
  highlightText,
  href,
  prefixText,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between my-1 border-b-[3px] border-gray-200/60">
      <h2 className="text-gray-600 font-semibold tracking-wider -mb-[0.2rem] pb-3 border-b-[3px] border-brand">
        {prefixText} <span className="text-brand">{highlightText}</span>
      </h2>

      {href && (
        <div className="flex items-center gap-6 -mt-2">
          <Link href={href} className="text-sm flex items-center">
            See All <ChevronRight className="text-brand" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
