import Price from "@/components/Price";
import { Tags } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductRatings from "./[subCategoryId]/[productId]/ProductsRatings";

type Props = {
  productid?: number;
  productsubcategory?: number;
  productname: string;
  productdescription?: string;
  productimage?: string;
  productprice: string;
  discountedPrice?: number;
  discountPercentage: number;
  productCategoryId: number;
  average_rating: number;
};

export default function ProductsCard({
  productid,
  productname,
  discountPercentage,
  productimage,
  discountedPrice,
  productprice,
  productCategoryId,
  average_rating,
}: Props) {
  return (
    <>
      <Link
        className="h-full bg-white"
        // href={`/bazar/products/${productsubcategory}/${productid}/`}
        href={`/bazar/products/${productCategoryId}/${productid}/`}
      >
        <section className="h-full pb-5 text-start transform duration-500 hover:-translate-y-2 cursor-pointer border rounded-lg overflow-hidden">
          <img
            className="aspect-square w-full object-center object-cover rounded"
            src={productimage || ""}
            alt={`product-image-${productname}`}
            loading="lazy"
          />

          <h4 className="text-sm font-medium my-3 px-5 line-clamp-2">
            {productname}
          </h4>
          <div className="flex justify-between flex-wrap text-lg px-5">
            <h6 className="font-semibold text-brand text-[0.920rem]">
              <Price
                amount={discountedPrice ? discountedPrice : productprice}
              />
            </h6>
            {discountedPrice
              ? discountedPrice !== parseFloat(productprice) && (
                  <span className="line-through text-gray-400 text-[0.920rem] font-semibold">
                    <Price amount={productprice} />
                  </span>
                )
              : null}
          </div>
          <div className="flex flex-wrap gap-2 px-5">
            {!!discountPercentage ? (
              <div className="flex items-center gap-2 px-2 py-1 text-xs sm:text-base border-[1px] text-white bg-[#009900] rounded-3xl font-medium">
                <Tags className="text-white h-5 w-5" />
                <span className="text-sm">
                  <span className="font-semibold">{discountPercentage}%</span>{" "}
                  OFF
                </span>
              </div>
            ) : null}

            <div className="mt-2">
              {!!average_rating ? (
                <ProductRatings rating={average_rating} sm />
              ) : null}
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}
