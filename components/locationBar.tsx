import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

function LocationBar() {
  return (
    <div className="h-10 flex bg-white sticky justify-center md:justify-between items-center rounded-b-lg md:px-4 top-0 mx-auto max-w-[1440px] z-10">
      {/* <div title="Geographical Map">
        <Link
          href={"/locations"}
          className="flex text-sm py-1 px-2 items-center bg-white justify-evenly cursor-pointer w-full md:w-[200px] rounded-lg"
        >
          <MapPin className="h-5 w-5 text-center bottom-0 font-bold text-slate-800 md:mr-1" />
          <p className="w-full md:w-[200px] truncate">
            <span className="text-slate-800 font-bold px-0.5">
              View Locations
            </span>
          </p>
        </Link>
      </div> */}
      {/* <div className="ml-auto flex items-center px-2 md:px-0 gap-x-6">
        <Link
          href="/ourmission"
          title="Our Mission"
          className="flex px-0.5 md:px-2 my-3 text-xs md:text-sm font-semibold md:font-medium border-e-[1.5px] border-e-slate-200 text-center bg-white"
        >
          Our Mission
        </Link>
        <Link
          href="/contact"
          title="Contact Us"
          className="flex px-0.5 md:px-2 my-3 text-xs md:text-sm font-semibold md:font-medium border-e-[1.5px] border-e-slate-200 text-center bg-white"
        >
          Contact
        </Link>
        <Link
          href="/request-product"
          title="Contact Us"
          className="flex px-0.5 md:px-2 my-3 text-xs md:text-sm font-semibold md:font-medium border-e-[1.5px] border-e-slate-200 text-center bg-white"
        >
          Request Product
        </Link>
        <Link
          href="/faqs"
          title="Frequently Asked Questions"
          className="flex px-0.5 md:px-2 my-3 text-xs md:text-sm font-semibold md:font-medium text-center bg-white"
        >
          FAQs
        </Link>
      </div> */}
    </div>
  );
}

export default LocationBar;
