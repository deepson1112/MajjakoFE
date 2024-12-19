import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import Wishlists from "./Wishlists";
import WishlistsCart from "./WishlistsCart";

interface WishlistsPageProps {
  params: {
    uuid: string;
  };
}

const WishlistsPage = ({ params }: WishlistsPageProps) => {
  const { uuid } = params;

  return (
    <MaxWidthWrapper className="mx-4 md:mx-10 py-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h4 className="font-semibold text-2xl mb-6">My Wishlists</h4>
          <Wishlists uuid={uuid} />
        </div>

        <div>
          <h4 className="font-semibold text-3xl mb-6">Wishlists Cart</h4>
          <WishlistsCart uuid={uuid} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default WishlistsPage;
