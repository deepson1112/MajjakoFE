"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MobileWishlistContainer from "@/components/Mobile-Wishlist/MobileWishlistContainer";
import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import useScreenWidth from "@/hooks/useScreenWidth";
import { bazarWishlistsNavigation } from "@/lib/Constants";
import React, { Suspense } from "react";

interface DisplayWishlistsPageProps {
  children: React.ReactNode;
}

const DisplayWishlistsPage = ({ children }: DisplayWishlistsPageProps) => {
  const { isMobileView } = useScreenWidth();
  return isMobileView ? (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="fixed inset-0 z-50 bg-black/50" />
      <div className="slide-in-top fixed top-10 left-0 w-full h-full bg-white z-[500] shadow-[0_-14px_15px_-3px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="relative h-full w-full">
          <ScrollArea className="h-full overflow-y-auto px-3 py-4 space-y-4">
            {children}
          </ScrollArea>
        </div>
      </div>
    </Suspense>
  ) : (
    <MaxWidthWrapper className="my-6">
      <AnimatedTabs sticky={false} tabs={bazarWishlistsNavigation} />
      {children}
    </MaxWidthWrapper>
  );
};

export default DisplayWishlistsPage;
