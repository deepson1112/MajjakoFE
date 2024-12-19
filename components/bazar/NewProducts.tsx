import React from "react";
import Productcard from "./productcard";

const NewProducts = () => {
  return (
    <div className="w-full no-visible-scrollbar grid grid-rows-2 grid-flow-col overflow-x-auto lg:grid-rows-none lg:grid-flow-row-dense lg:hidden  gap-y-4 gap-x-0 place-items-center ">
      {/* <Productcard
        price={100}
        title="Hello world"
        image="https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per1-400x400.jpg"
      /> */}
    </div>
  );
};

export default NewProducts;
