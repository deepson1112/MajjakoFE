"use client";
import { Heart, Home, LogIn, Store, User, Utensils } from "lucide-react";
import Link from "next/link";
import React from "react";
import useUser from "@/lib/useUser";
import { UnAuthenticatedModal } from "./UnAuthenticatedModal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileDrawerCart } from "./sidecart/MobileDrawerCart";
import { useQuery } from "react-query";
import { WishlistItem } from "@/types";
import { api } from "@/lib/fetcher";
import Cart from "./cart/Cart";

const MobileNav = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-wishlist/retail-wishlist/")
        .json<WishlistItem[]>();
      return response;
    },
    queryKey: ["retail-wishlists"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <footer className="md:hidden fixed left-0 bottom-0 w-full h-[80px] z-50">
      <nav className="relative flex h-full items-stretch justify-start ">
        <div className="flex-auto flex items-center justify-center">
          <div className="w-6 h-6  z-20">
            <Link
              href={"/"}
              className={cn(
                pathname === "/" ? "text-brand" : "text-black",
                "cursor-pointer flex flex-col items-center"
              )}
            >
              <Home />
              <span className="block text-xs">Home</span>
            </Link>
          </div>
        </div>
        <div className="flex-auto flex items-center justify-center">
          <div className="w-6 h-6  z-20">
            <Link
              href={"/bazar/products/"}
              className={cn(
                pathname.startsWith("/bazar/products") ? "text-brand" : "",
                "cursor-pointer flex flex-col items-center"
              )}
            >
              <Store />
              <span className="block text-xs">Bazar</span>
            </Link>
          </div>
        </div>

        {user ? (
          <MobileDrawerCart />
        ) : (
          <UnAuthenticatedModal>
            <div className="relative flex-auto flex items-center justify-center">
              <div className="absolute left-1/2 top-0 flex items-center justify-center w-[60px] h-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-brand rounded-full shadow-[0px_10px_40px_-3px_rgba(0,0,0,0.5)]">
                <div className="w-6 h-6 ">
                  <div className="cursor-pointer text-white">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </UnAuthenticatedModal>
        )}

        <div className="flex-auto flex items-center justify-center">
          <div className="w-6 h-6  z-20">
            {user ? (
              // <Link
              //   href={"/bazar/wishlists"}
              //   className={cn(
              //     pathname.startsWith("/bazar/wishlists") ? "text-brand" : "",
              //     "cursor-pointer flex flex-col items-center"
              //   )}
              // >
              //   <Heart />
              //   <span className="block text-xs">Wishlist</span>
              // </Link>
              <div className="flex-auto flex items-center justify-center">
                <div className="w-6 h-6  z-20">
                  <Link
                    href={"/bazar/wishlists"}
                    className={cn(
                      pathname.startsWith("/sign-in") ? "text-brand" : "",
                      "cursor-pointer flex flex-col items-center"
                    )}
                  >
                    <div
                      className={cn(
                        pathname.startsWith("/bazar/wishlists")
                          ? "text-brand"
                          : "",
                        "cursor-pointer flex flex-col items-center relative"
                      )}
                    >
                      <Heart />
                      <span className="block text-xs">Wishlist</span>
                      <span
                        className={cn(
                          "h-4 w-4 rounded-full  absolute -top-1 right-0 grid place-items-center text-xs bg-brand text-white"
                        )}
                      >
                        {(wishlists && wishlists?.length) || "0"}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <UnAuthenticatedModal>
                <div className="flex flex-col items-center">
                  <Heart />
                  <span className="block text-xs">Wishlist</span>
                </div>
              </UnAuthenticatedModal>
            )}
          </div>
        </div>
        <div className="flex-auto flex items-center justify-center">
          <div className="w-6 h-6  z-20">
            {!!user ? (
              <Link
                className={cn(
                  pathname.startsWith("/my-account") ? "text-brand" : "",
                  "cursor-pointer flex flex-col items-center"
                )}
                href={"/my-account"}
              >
                <User />
                <span className="block text-xs">Account</span>
              </Link>
            ) : (
              <Link
                href={"/sign-in"}
                className={cn(
                  pathname.startsWith("/sign-in") ? "text-brand" : "",
                  "cursor-pointer flex flex-col items-center"
                )}
              >
                <LogIn />
                <span className="block text-xs w-full">Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 z-0">
        <svg
          className="absolute left-1/2 transform -translate-x-1/2 w-[128px]"
          width="128"
          height="80"
          viewBox="0 0 128 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0C34 0 32 34 64 34C96 34 94.0002 0 128 0V128H0V0Z"
            fill="white"
          />
        </svg>
        <div className="absolute top-0 left-0 h-full w-[calc(50%-64px)] bg-white"></div>
        <div className="absolute top-0 right-0 h-full w-[calc(50%-64px)] bg-white"></div>
      </div>

      <div className="absolute bottom-0 w-full h-[40px] bg-green-800 -z-10 shadow-[0px_-50px_15px_-3px_rgba(0,0,0,0.15)]"></div>
    </footer>
  );
};

export default MobileNav;
