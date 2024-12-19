import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Gift, ShieldCheck, ShoppingCart } from "lucide-react";
import React from "react";

const BazarInformationDetails = [
  {
    title: "Fast Delivery",
    description: "Streamline your online food ordering and eCommerce.",
    icon: <ShoppingCart className="w-14 h-14" />,
  },
  {
    title: "Discount",
    description: "Streamline your online food ordering and eCommerce.",
    icon: <Gift className="w-14 h-14" />,
  },
  {
    title: "Fast Delivery",
    description: "Streamline your online food ordering and eCommerce.",
    icon: <ShieldCheck className="w-14 h-14" />,
  },
];

const BazarInformation = () => {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-3 bg-gray-100 px-8 py-10 rounded-2xl">
        {BazarInformationDetails.map((info) => (
          <div key={`bazar-${info.title}`} className="flex items-center gap-6">
            <div className="p-2 bg-brand rounded-full text-white h-[100px] w-[100px] grid place-items-center">
              {info.icon}
            </div>
            <div>
              <h6 className="font-semibold text-2xl">{info.title}</h6>
              <p className="text-gray-600">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default BazarInformation;
