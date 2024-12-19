"use client";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import CartCounterAndButtons from "@/components/cart/CartCounterAndButtons";
import MenuSidebar from "./MenuSidebar";
import {
  CartQuantityType,
  FoodItem,
  VendorCategoryType,
  VendorDetails,
} from "@/types";
import DecreaseCartModal from "@/components/cart/DecreaseCartModal";
import { useIsClient } from "@/lib/isClient/is-client-ctx";
import useUser from "@/lib/useUser";
import { GuestLogin } from "./GuestLogin";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import CartQuantity from "./CartQuantity";

interface MenuContainerProps {
  menus: VendorCategoryType[];
  vendors?: VendorDetails[];
}

export default function MenuContainer({ menus, vendors }: MenuContainerProps) {
  const ref = useRef<(HTMLDivElement | Element | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isClient = useIsClient();
  const { isLoading, user } = useUser();

  const handleScrollIntoView = (index: number) => {
    const element = ref.current.length && ref.current[index];
    if (isClient) {
      if (element) {
        if (typeof window !== "undefined") {
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offset = 100;

          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const { data: cartQty, isLoading: cartQtyLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/marketplace/cart-quantity/")
        .json<CartQuantityType[]>();
      return response;
    },
    queryKey: ["food-cart-quantity"],
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        const visibleIndex = ref.current.indexOf(visibleEntry.target);
        setActiveIndex(visibleIndex);
      }
    });

    ref.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [menus]);

  return (
    <div className="flex flex-col items-stretch sm:flex-auto md:flex-row md:items-start mt-8 relative">
      <section className="md:max-w-[17rem] w-full max-h-screen sticky top-0 md:top-32 bg-white z-[9] px-3 py-6 md:py-3">
        <ul className="w-full flex flex-row md:flex-col md:items-start space-x-5 md:space-x-0 md:space-y-5 font-semibold">
          {menus && (
            <MenuSidebar
              vendors={vendors}
              menus={menus}
              scrollIntoViewHandler={handleScrollIntoView}
              activeIndex={activeIndex}
            />
          )}
        </ul>
      </section>

      <section className="w-full">
        {menus &&
          !!menus.length &&
          menus.map((food, index) => {
            if (!food.fooditem_set.length) return;
            return (
              <div
                className="mb-10"
                key={index}
                ref={(el) => (ref.current[index] = el)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl mb-6">
                    {food.category_name}
                  </h3>
                  <Button variant={"ghost"}>
                    See All <ChevronRight />{" "}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {food.fooditem_set.map((data: FoodItem, index: number) => (
                    <div
                      // ref={ref}
                      key={index}
                      className="cursor-pointer hover:shadow-md group w-full h-36 rounded-lg flex justify-between border"
                    >
                      <div className="p-4">
                        <h3 className="font-semibold">{data.food_title}</h3>
                        <p className="line-clamp-2 text-xs text-gray-50000">
                          {data.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <h6>${data.price}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        {/* removed for now */}

                        {!!data.image && (
                          <Image
                            height={1000}
                            width={1000}
                            alt="Food-image"
                            src={data.image}
                            className={`object-center object-cover rounded-r-sm max-w-[150px] h-full brightness-75
                          `}
                          />
                        )}

                        {data.discount_percentage ? (
                          <p
                            className={`absolute ${
                              data.discount_percentage === 0
                                ? "hidden"
                                : "block"
                            } text-sm top-0 right-0 bg-white px-2 font-bold text-orange-700 place-items-center rounded-s-full`}
                          >
                            {data.discount_percentage}% OFF
                          </p>
                        ) : null}
                        <Suspense fallback={<p>Loading...</p>}>
                          <div className="absolute bottom-2 right-4 hover:bg-gray-800 text-white grid place-items-center rounded-full">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 border">
                              {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-600" />
                              ) : !!user ? (
                                <>
                                  <DecreaseCartModal
                                    foodTitle={data.food_title}
                                    addons={data.food_addons}
                                    fooditem={data.id}
                                  />
                                  <CartQuantity
                                    foodItem={data.id}
                                    cartQty={cartQty}
                                  />
                                  <CartCounterAndButtons
                                    foodTitle={data.food_title}
                                    addons={data.food_addons}
                                    fooditem={data.id}
                                  />
                                </>
                              ) : (
                                <GuestLogin>
                                  <button className="bg-gray-900 rounded-full">
                                    <Plus width={24} height={24} />
                                  </button>
                                </GuestLogin>
                              )}
                            </div>
                          </div>
                        </Suspense>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
