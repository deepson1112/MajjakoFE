import React from "react";
import { motion } from "framer-motion";
import OtherInfo from "./OtherInfo";
import { Data, CurrentSlideData } from "./";
import { Eye } from "lucide-react";

type Props = {
  transitionData: Data;
  currentSlideData: CurrentSlideData;
};

function SlideInfo({ transitionData, currentSlideData }: Props) {
  return (
    <>
      <motion.span
        layout
        className="hidden md:block mb-2 h-1 w-5 rounded-full bg-white"
      />
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div
        layout
        className=" mt-5 flex items-center justify-center md:justify-normal gap-3"
      >
        <button
          className="flex h-[41px] w-[41px] items-center justify-center rounded-full bg-brand text-xs  transition 
            duration-300 ease-in-out hover:opacity-80 "
        >
          <Eye className=" text-xl" />
        </button>
        <button
          className=" w-fit rounded-full border-[1px] border-[#ffffff8f] px-6 py-3 text-[16px] font-thin transition duration-300 
            ease-in-out hover:bg-white hover:text-black "
        >
          View Product
        </button>
      </motion.div>
    </>
  );
}

export default SlideInfo;
