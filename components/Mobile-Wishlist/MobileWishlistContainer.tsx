import React, { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import ShareWishlists from "./MobileShareWishlists";
import MobileActiveWishlist from "./MobileActiveWishlist";
import MobileCompletedWishlists from "./MobileCompletedWishlists";

interface MobileWishlistContainerProps {
  setIsWishlistDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileWishlistContainer = ({
  setIsWishlistDrawerOpen,
}: MobileWishlistContainerProps) => {
  return (
    <>
      <Tabs defaultValue="share">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="share">Share</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="share">
          <ShareWishlists />
        </TabsContent>
        <TabsContent value="active">
          <MobileActiveWishlist />
        </TabsContent>

        <TabsContent value="completed">
          <MobileCompletedWishlists />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MobileWishlistContainer;
