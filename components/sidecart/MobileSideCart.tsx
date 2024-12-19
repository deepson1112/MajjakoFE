"use client";

import Cart from "../cart/Cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SideCartBazarContainer,
  SideCartResturantContainer,
} from "./SideCartContainer";
import { Button } from "../ui/Button";
import { ChevronRight } from "lucide-react";

export function MobileSideCart() {
  const [sideCartOpen, setSideCartOpen] = useState(false);
  const router = useRouter();

  const handleNavigatePage = ({ url }: { url: string }) => {
    setSideCartOpen(false);
    router.push(url);
  };

  return (
    <Sheet open={sideCartOpen} onOpenChange={setSideCartOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer text-white">
          <Cart />
        </div>
      </SheetTrigger>
      <SheetContent
        className="max-w-[28rem] w-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Cart Items</SheetTitle>
          <SheetDescription>
            Make modifications to your cart items or proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        {/* {currentRoute.startsWith("/restaurant") ? (
          <SideCartResturantContainer handleNavigatePage={handleNavigatePage} />
        ) : null} */}

        {/* {currentRoute.startsWith("/bazar") ? ( */}
        <div className="w-full h-full relative">
          <Button
            variant={"subtle"}
            className="absolute -left-[1.5rem] bottom-24 rounded-l-none"
            onClick={(prev) => setSideCartOpen(!prev)}
          >
            {/* Close */}
            <ChevronRight />{" "}
          </Button>
          <SideCartBazarContainer handleNavigatePage={handleNavigatePage} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
