import { Button } from "@/components/ui/Button";
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { userCart } from "@/types";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import List from "./List";

interface CartContainerProps {
  userCartLoader: boolean;
  userCart: userCart[];
}

const CartContainerList = ({
  userCartLoader,
  userCart,
}: CartContainerProps) => {
  const { mutate: handleUpdateCartQuantity, isLoading } = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      id: number;
      payload: { quantity: number };
    }) => {
      const response = await api()
        // .put(payload, `/marketplace/update-quantity/${id}/`)
        .patch(payload, `/marketplace/update-cart-quantity/${id}/`)
        .json();
      return response;
    },
  });
  return (
    <div className="flow-root">
      <ul className="max-h-[30rem] overflow-y-auto scrollBar px-2">
        {userCartLoader ? (
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
          </div>
        ) : userCart && userCart.length ? (
          <>
            {userCart.map((cart) => (
              <List
                key={cart.id}
                cartdata={cart}
                mutationFn={handleUpdateCartQuantity}
              />
            ))}
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default CartContainerList;
