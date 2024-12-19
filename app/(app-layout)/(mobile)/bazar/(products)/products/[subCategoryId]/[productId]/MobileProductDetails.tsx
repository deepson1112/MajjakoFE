"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BellPlus, Heart, Minus, Plus, ShoppingCart, X } from "lucide-react";
import {
  areArraysEqual,
  capitalizeWord,
  cn,
  encodeFiltersToURLSafe,
} from "@/lib/utils";
import { Product, ProductVariation } from "@/types";
import SimilarProduct from "./SimilarProduct";
import { queryClient } from "@/lib/queryClient";
import ProductWishlist from "./ProductWishlist";
import useUser from "@/lib/useUser";
import { GuestLogin } from "@/app/(app-layout)/(mobile)/(restaurant)/restaurant/menu/GuestLogin";
import { RefundToolTip } from "./RefundToolTip";
import AddToWatchlist from "./AddToWatchlist";
import { UnAuthenticatedModal } from "@/components/UnAuthenticatedModal";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { MobileProductInfo } from "./ProductInfo";
import ProductRatings from "./ProductsRatings";
import Link from "next/link";
import DeliveryInformation from "./DeliveryInformation";
import { OverallProductRating } from "./ProductOverallRating";
import { Skeleton } from "@/components/ui/Skeleton";
import { Share } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RouterBack from "@/app/(app-layout)/(mobile)/account/orders/retail-orders/[order_id]/RouterBack";
import ProductsLoader from "./ProductsLoader";
import { ZoomableImage } from "./zoomable-image";
import { ProductVariantsCarousel } from "./ProductVariantsCarousel";
import { SpecialRequest } from "./SpecialRequest";

interface AddProductToCartPayload {
  retail_product: string | number;
  quantity: number;
  retail_product_variation: number | null;
  special_request: string | null;
  receiver_name: string | null;
  buy_now?: boolean;
}
export interface UserWishlistsType {
  product_variation: number[];
}

export interface UserWatchList {
  id: number;
  created_at: string;
  user: number;
  product_variation: {
    id: number;
    price: number;
    product_name: string;
    sku: string;
  };
}

const MobileProductDetails = ({ id, subId }: { id: string; subId: string }) => {
  const { isLoading, user } = useUser();
  const [currentVariation, setCurrentVariation] =
    useState<ProductVariation | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentVariantStock, setCurrentVariantStock] = useState<number | null>(
    null
  );
  const [isSpecialRequestModalOpen, setIsSpecialRequestModalOpen] =
    useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const currentRoute = usePathname();
  const router = useRouter();

  const { data: currentProduct, isLoading: productLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/retail-products-display/${id}`)
        .json<Product>();
      return response;
    },
    queryKey: [`retail-product-${id}-${subId}`, id, subId],
    onSuccess: (data) => {
      console.log("On Sucess Product Deails", data);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: userWishlists, isLoading: userWishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-wishlist/user_wishlist/`)
        .json<UserWishlistsType>();
      return response;
    },
    queryKey: [`user-wishlist`],

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: userWatchLists, isLoading: userWatchListsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/watchlist/user-watchlist/`)
        .json<UserWatchList[]>();
      return response;
    },
    queryKey: [`user-watchlists`],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: productOverallRating, isLoading: productOverallRatingLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(`/review/average-review/${id}/`)
          .json<OverallProductRating>();
        return response;
      },
      queryKey: [`overall-product-ratings-${id}`, id],
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const {
    mutate: handleAddProductToCartFn,
    isLoading: handleAddProductToCartLoader,
  } = useMutation({
    mutationFn: async (payload: AddProductToCartPayload) => {
      const response = await api()
        .post(payload, "/retail-marketplace/retail-cart/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Successfully added product to the cart");
      queryClient.invalidateQueries("retail-cart-data");
      setIsSpecialRequestModalOpen(false);
      setProductQuantity(1);
    },
    onError: (error: any) => {
      toast.error("Unable to add product", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleAddProductToCart = () => {
    handleAddProductToCartFn({
      quantity: productQuantity,
      receiver_name: null,
      retail_product: id,
      retail_product_variation: currentVariation?.id || null,
      special_request: null,
    });
  };

  const handleAddProductToCartWithSpecialRequest = (
    special_request: string
  ) => {
    handleAddProductToCartFn({
      quantity: productQuantity,
      receiver_name: null,
      retail_product: id,
      retail_product_variation: currentVariation?.id || null,
      special_request,
    });
  };

  const handleBuyNowFn = () => {
    handleBuyNow({
      quantity: productQuantity,
      receiver_name: null,
      retail_product: id,
      retail_product_variation: currentVariation?.id || null,
      special_request: null,
      buy_now: true,
    });
  };

  const { mutate: handleBuyNow, isLoading: handleBuyNowLoader } = useMutation({
    mutationFn: async (payload: AddProductToCartPayload) => {
      const response = await api()
        .post(payload, "/retail-marketplace/retail-cart/")
        .json();
      return response;
    },
    onSuccess: () => {
      setProductQuantity(1);
      router.push("/bazar/checkout?buy_now=true");
    },
    onError: (error: any) => {
      toast.error("Unable to add product", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleVariationChange = ({
    variation_type,
    id,
    variation_name,
    variation_type_name,
  }: {
    variation_type: number;
    id: number;
    variation_type_name: string;
    variation_name: string;
  }) => {
    const updatedVariation = currentVariation?.variation.map((value) =>
      value.variation_type === variation_type
        ? { variation_type, id, variation_name, variation_type_name }
        : value
    );

    const newVariation = currentProduct?.products_variations.find((value) =>
      areArraysEqual(value.variation, updatedVariation || [])
    );

    if (newVariation) {
      setCurrentVariation(newVariation);
      setCurrentVariantStock(Number(newVariation.stock_quantity));

      setCurrentImage(
        newVariation.variations_image[0].image ||
          currentProduct?.products_variations[0]?.variations_image[0]
            ?.default_image ||
          ""
      );
    } else {
      setCurrentVariation((prev) => {
        if (!prev) return null;
        return {
          ...prev,

          variation: updatedVariation || [],
        };
      });
      setCurrentVariantStock(null);
    }
  };

  if (currentProduct) {
    currentProduct.variations_data.map((ele) =>
      ele.available_variations.map((e) =>
        currentVariation?.variation.some((val) => {
          val.id === e.id ? null : null;
          return val.id === e.id;
        })
      )
    );
  }

  useEffect(() => {
    if (currentProduct) {
      setCurrentVariation(currentProduct.products_variations[0]);
      setCurrentVariantStock(
        Number(currentProduct.products_variations[0]?.stock_quantity)
      );
      setCurrentImage(
        currentProduct?.products_variations[0]?.variations_image[0]?.image ||
          currentProduct?.products_variations[0]?.variations_image[0]
            ?.default_image ||
          ""
      );
    }
  }, [currentProduct]);

  return productLoader ? (
    <ProductsLoader />
  ) : (
    currentVariation && currentProduct && (
      <>
        <div className="top-0 w-full sticky flex items-center justify-between px-4 py-2 bg-white z-20 rounded-t-xl">
          <div>
            <RouterBack subtle>
              <X className="w-8 h-8 text-gray-500" />
            </RouterBack>
          </div>

          {userWishlistsLoader ? (
            <div>loading...</div>
          ) : !!userWishlists && !user?.guest_user ? (
            <ProductWishlist
              currentVariation={currentVariation?.id}
              userWishlists={userWishlists}
              isMobile
            />
          ) : (
            <UnAuthenticatedModal>
              <Heart />
            </UnAuthenticatedModal>
          )}
        </div>

        <MaxWidthWrapper className="mb-48">
          <div className="scroll-area md:flex md:items-start">
            <div className="flex-1 flex flex-col items-start gap-3">
              <picture className="w-full h-auto gap-4 rounded-md overflow-hidden outline outline-offset-2 outline-gray-100 p-3">
                <ZoomableImage
                  src={currentImage}
                  alt="product-image"
                  width={1000}
                  height={1000}
                />
              </picture>

              <ProductVariantsCarousel
                currentProduct={currentProduct}
                setCurrentImage={setCurrentImage}
                currentImage={currentImage}
                currentVariation={currentVariation}
              />
            </div>

            <div className="w-full p-2 mt-5 md:ml-8 md:mt-0 md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="space-y-3">
                  {productOverallRatingLoader ? (
                    <Skeleton className="w-14 h-6 rounded-xl" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <ProductRatings
                        rating={productOverallRating?.average_rating || 0}
                      />
                      <span
                        className={cn(
                          !!productOverallRating?.total_review
                            ? "text-sm"
                            : "text-xs",
                          "text-gray-500"
                        )}
                      >
                        (
                        {!!productOverallRating?.total_review
                          ? productOverallRating?.total_review
                          : "No Reviews"}
                        )
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-[600]">
                    {capitalizeWord(currentProduct?.name)}
                  </h3>
                  <div className="max-w-fit space-x-2 text-sm md:text-xs">
                    <span className="font-semibold text-left border px-2 rounded-md">
                      <span className="text-gray-500 font-light">Vendor:</span>{" "}
                      {currentProduct.vendor.vendor_name}
                    </span>

                    <Link
                      // href={`/bazar/products?vendor=${currentProduct.vendor.id}`}
                      href={`/bazar/products/?dqs=${encodeFiltersToURLSafe(
                        "vendor=" + currentProduct.vendor.id
                      )}`}
                      className=" px-2 rounded-md text-brand bg-brand/10 font-semibold"
                    >
                      More from vendor
                    </Link>
                  </div>

                  <div className="hidden md:inline-block text-sm text-gray-600">
                    <p>{currentProduct.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className=" gap-2 cursor-pointer my-0 py-0 rounded-full bg-gray-100 flex items-center text-sm px-4 h-6"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://majjakodeals.com${currentRoute}`
                        );
                        toast.info("Link copied to your clipboard");
                      }}
                    >
                      <span className="w-3 h-3 -mt-1">{Share}</span>
                      Share
                    </button>

                    {userWatchListsLoader || isLoading ? (
                      <div>Loading...</div>
                    ) : user && !user.guest_user ? (
                      <AddToWatchlist
                        currentVariation={currentVariation?.id}
                        userWatchLists={userWatchLists || []}
                        isActive={!!user}
                        isMobile
                      />
                    ) : (
                      <UnAuthenticatedModal>
                        <BellPlus />
                      </UnAuthenticatedModal>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pb-6">
                  {currentProduct?.variations_data.map((variation_data) => (
                    <div
                      className={`mt-4 ${
                        variation_data.name === "Color" ? "order-first" : ""
                      }`}
                      key={`current-product-variations-${variation_data.id}`}
                    >
                      <h6 className="font-semibold">{variation_data.name}: </h6>
                      {variation_data.name === "Color" ? (
                        <div className="flex items-center gap-3 mt-2 order-1">
                          {variation_data.available_variations.map(
                            (available_variation) => (
                              <Button
                                key={`variations-data-${available_variation.id}`}
                                variant={"outline"}
                                style={{
                                  background: available_variation.name,
                                }}
                                className={`h-8 w-7 rounded-md bg-${
                                  available_variation.name
                                } ${
                                  currentVariation?.variation.some(
                                    (value) =>
                                      value.id === available_variation.id
                                  )
                                    ? "outline outline-2 outline-offset-2 outline-brand"
                                    : "outline-none"
                                }`}
                                onClick={() =>
                                  handleVariationChange({
                                    id: available_variation.id,
                                    variation_type: variation_data.id,
                                    variation_name: available_variation.name,
                                    variation_type_name: variation_data.name,
                                  })
                                }
                              ></Button>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 mt-2">
                          {variation_data.available_variations.map(
                            (available_variation) => (
                              <Button
                                key={`variations-data-${available_variation.id}`}
                                variant={"outline"}
                                className={` rounded-xl font-semibold bg-${
                                  available_variation.name
                                } ${
                                  currentVariation?.variation.some(
                                    (value) =>
                                      value.id === available_variation.id
                                  )
                                    ? "border-[1.5px] border-brand text-gray-800"
                                    : "border-none text-gray-500"
                                }`}
                                onClick={() =>
                                  handleVariationChange({
                                    id: available_variation.id,
                                    variation_type: variation_data.id,
                                    variation_name: available_variation.name,
                                    variation_type_name: variation_data.name,
                                  })
                                }
                              >
                                {capitalizeWord(available_variation.name)}
                              </Button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <DeliveryInformation />

                {!!currentProduct.refund_policies ? (
                  <div className="border border-brand/50 p-3 rounded-lg my-4">
                    <span className="font-semibold">
                      Refunded Policies for the product:
                    </span>
                    <ul className="list-inside list-disc space-y-1">
                      {currentProduct.refund_policies.map((policy) => (
                        <div
                          className="flex items-center gap-2"
                          key={policy.id}
                        >
                          <li>{policy.policy}</li>
                          <RefundToolTip
                            description={policy.description || ""}
                          />
                        </div>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <MobileProductInfo
            currentProduct={currentProduct}
            currentVariation={currentVariation}
          />

          <SimilarProduct isMobile subId={subId} id={`${currentProduct.id}`} />
        </MaxWidthWrapper>

        <div className="fixed bottom-10 flex flex-col items-stretch space-y-4 w-full rounded-t-xl shadow-[0_-14px_15px_-3px_rgba(0,0,0,0.1)] bg-white p-3">
          <div className="flex-1 flex items-center justify-between rounded-md p-2">
            <button
              onClick={() =>
                setProductQuantity((prev) => (prev === 1 ? 1 : --prev))
              }
            >
              <Minus className="w-6 h-6" />
            </button>

            <p className="font-semibold flex items-center gap-1">
              <span>{`Rs.${currentVariation.price}`}</span>
              <span className="font-thin text-brand">x</span>
              <span className="text-brand">{productQuantity}</span>
            </p>

            <button
              className="w-fit"
              onClick={() => {
                setProductQuantity((prev) =>
                  prev < currentVariation.stock_quantity ? ++prev : prev
                );
              }}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className=" flex items-center gap-4">
            {!!user ? (
              <Button
                isLoading={handleBuyNowLoader}
                disabled={handleBuyNowLoader}
                onClick={() => handleBuyNowFn()}
                className="text-xs md:text-sm whitespace-nowrap bg-[#f66645]"
              >
                Buy Now
              </Button>
            ) : (
              <GuestLogin onSuccessFn={handleBuyNowFn}>
                <Button className="text-xs md:text-sm whitespace-nowrap bg-[#f66645]">
                  Buy Now
                </Button>
              </GuestLogin>
            )}

            {currentVariation.stock_quantity !== 0 ? (
              <div className="flex items-center gap-2 w-full">
                {!!user ? (
                  currentProduct.special_request ? (
                    <SpecialRequest
                      handleAddProductToCartWithSpecialRequest={
                        handleAddProductToCartWithSpecialRequest
                      }
                      handleAddProductToCartLoader={
                        handleAddProductToCartLoader
                      }
                      isSpecialRequestModalOpen={isSpecialRequestModalOpen}
                      setIsSpecialRequestModalOpen={
                        setIsSpecialRequestModalOpen
                      }
                    >
                      <Button className="flex-1 text-xs md:text-sm w-full">
                        Add to cart{" "}
                        <ShoppingCart className="ml-2 hidden lg:block" />
                      </Button>
                    </SpecialRequest>
                  ) : (
                    <Button
                      onClick={handleAddProductToCart}
                      isLoading={handleAddProductToCartLoader}
                      disabled={handleAddProductToCartLoader}
                      className="flex-1 text-xs md:text-sm"
                    >
                      Add to cart{" "}
                      <ShoppingCart className="ml-2 hidden lg:block" />
                    </Button>
                  )
                ) : (
                  <GuestLogin onSuccessFn={handleAddProductToCart}>
                    <Button className="flex-1 text-xs md:text-sm w-full">
                      Add to cart{" "}
                      <ShoppingCart className="ml-2 hidden lg:block" />
                    </Button>
                  </GuestLogin>
                )}
              </div>
            ) : (
              <Button className="bg-gray-700">Out of Stock</Button>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default MobileProductDetails;
