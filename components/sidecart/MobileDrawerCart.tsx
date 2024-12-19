"use client";

import * as React from "react";
import Cart from "../cart/Cart";
import { useRouter } from "next/navigation";
import { MobileCartContainer } from "./MobileCartContainer";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function MobileDrawerCart() {
  const [sideCartOpen, setSideCartOpen] = React.useState(false);

  const router = useRouter();

  const handleNavigatePage = ({ url }: { url: string }) => {
    console.log("Navication");
    setSideCartOpen(false);
    router.push(url);
  };

  return (
    <Sheet open={sideCartOpen} onOpenChange={setSideCartOpen}>
      <SheetTrigger asChild>
        <div className="relative flex-auto flex items-center justify-center">
          <div className="absolute left-1/2 top-0 flex items-center justify-center w-[60px] h-[60px] transform -translate-x-1/2 -translate-y-1/2 bg-brand rounded-full shadow-[0px_10px_40px_-3px_rgba(0,0,0,0.5)]">
            <div className="w-6 h-6 ">
              <div className="cursor-pointer text-white">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        side={"bottom"}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-t-2xl"
      >
        <ScrollArea className="overflow-y-auto">
          <MobileCartContainer
            handleNavigatePage={handleNavigatePage}
            setIsCartOpen={setSideCartOpen}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
