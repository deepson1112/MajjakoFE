"use client";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import ProductSkeleton from "../../(products)/products/ProductSkeleton";
import { Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type VariationImage = {
  id?: number;
  image?: string;
  created_date?: string;
  disabled?: boolean;
  default_image?: string;
};

type ProductVariation = {
  id: number;
  sku: string;
  price: number;
  discount_percentage: number;
  discounted_amount: number;
  variations_image: VariationImage[];
};

type Product = {
  id: number;
  name: string;
  sub_category: number;
  products_variations?: ProductVariation[];
};

type VendorPlatformOffer = {
  id: number;
  product: Product;
  discount_percentages: number;
  platform_offer: number;
  vendor: number;
};

type PlatformOfferProduct = {
  id: number;
  vendor_platform_offer: VendorPlatformOffer[];
  audience: string;
  offer_name: string;
  start_date: string;
  end_date: string;
  active: boolean;
  discount_banner: string;
  created_date: string;
  disabled: boolean;
  created_by: number;
};

const SalesProducts = ({ id }: { id: string }) => {
  const offer = useSearchParams();
  const offer_name = offer.get("offer");
  const {
    data: platformOfferProducts,
    isLoading: platformOfferProductsLoader,
  } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-offers/platform_offer/products/${id}/`)
        .json<PlatformOfferProduct>();
      return response;
    },
    queryKey: [`platform-offer-products-${id}`, id],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="rounded-2xl bg-brand p-1 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mx-3">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-white">Offer Discounts</p>
            <span className="rounded-lg bg-brand p-2 hidden md:flex">
              <Sparkles className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </span>
            <div className="flex gap-2">
              <p className="ml-3 font-semibold text-white">{offer_name}</p>
              <span className="font-medium text-white">Up to 50% Off</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {platformOfferProductsLoader ? (
          new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)
        ) : !!platformOfferProducts ? (
          platformOfferProducts.vendor_platform_offer.map((item) => (
            <Link
              className=""
              key={`sales-product-${item.id}`}
              href={`/bazar/products/${item.product.sub_category}/${item.product.id}`}
            >
              <section className="h-auto pb-10 text-start transform duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden border rounded">
                <img
                  className="aspect-square w-full object-center object-cover rounded"
                  src={
                    item?.product?.products_variations
                      ? item.product.products_variations[0].variations_image[0]
                          .default_image ||
                        item?.product?.products_variations[0]
                          ?.variations_image[0].image
                      : ""
                  }
                  alt=""
                />

                <h4 className="text-xl font-medium my-3 px-5 line-clamp-1">
                  {item.product.name}
                </h4>
                <h2 className="font-semibold text-xl mb-3 px-5">
                  $
                  {item.product?.products_variations
                    ? item.product?.products_variations[0].price
                    : "--"}
                </h2>
                <div className="flex flex-wrap gap-2 px-5">
                  {!!item.discount_percentages ? (
                    <div className="flex items-center gap-2 p-2 text-xs sm:text-base border-[1px] text-white bg-brand rounded-xl font-semibold">
                      <span>{item.discount_percentages}% Off</span>
                      <Tag fill="#ff4500" className="-rotate-45" />
                    </div>
                  ) : null}

                  <div className="p-2 text-xs sm:text-base border-[1px] border-gray-300 bg-white text-green-500 rounded-xl">
                    {platformOfferProducts.offer_name}
                  </div>
                </div>
              </section>
            </Link>
          ))
        ) : (
          <div>No Offers Items</div>
        )}
      </div>
    </>
  );
};

export default SalesProducts;
