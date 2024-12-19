"use client";
import { FoodItem, VendorDetails } from "@/types";
import { useRef } from "react";

type menusType = {
  category_name: string;
  vendor: number;
  fooditem_set: FoodItem[];
};

interface MenuSidebarProps {
  menus: menusType[];
  vendors?: VendorDetails[];
  scrollIntoViewHandler: (index: number) => void;
  activeIndex: number | null;
}

const MenuSidebar = ({
  menus,
  vendors,
  scrollIntoViewHandler,
  activeIndex,
}: MenuSidebarProps) => {
  function findVendorByID(
    vendors: VendorDetails[] | undefined,
    vendor_id: String
  ) {
    const item = vendors!.find((item) => item?.id.toString() === vendor_id);
    return item ? item.vendor_name : null;
  }

  return menus.map((data, index) =>
    data.fooditem_set.length ? (
      <li
        key={index}
        className={`cursor-pointer hover:underline hover:underline-offset-2 ${
          activeIndex === index
            ? "underline underline-offset-1"
            : "no-underline"
        }`}
        onClick={() => scrollIntoViewHandler(index)}
      >
        {vendors && vendors.length
          ? findVendorByID(vendors, data.vendor.toString())
          : data.category_name}
      </li>
    ) : null
  );
};

export default MenuSidebar;
