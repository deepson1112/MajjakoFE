import React from "react";
import { motion } from "framer-motion";
import { Data, CurrentSlideData } from "./";

type Props = {
  transitionData: Data;
  currentSlideData: CurrentSlideData;
};

function BackgroundImage({ transitionData, currentSlideData }: Props) {
  return (
    <>
      {transitionData && (
        <motion.img
          key={transitionData.img}
          layoutId={transitionData.img}
          alt="Transition Image"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-0 h-full w-full object-cover brightness-50 rounded-b-lg"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="Current Image"
        key={currentSlideData.data.img + "transition"}
        src={currentSlideData.data.img}
        className=" absolute left-0 top-0 h-full w-full object-cover brightness-50 rounded-b-lg"
      />
    </>
  );
}

export default BackgroundImage;
