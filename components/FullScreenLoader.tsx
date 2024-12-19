import Image from "next/image";
import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative animate-wavy">
        <Image
          src={"/final.svg"}
          alt="majjakodeals-logo"
          width={300}
          height={300}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
