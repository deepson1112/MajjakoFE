import { Button } from "@/components/ui/Button";
import { UnAuthenticatedModal } from "@/components/UnAuthenticatedModal";
import useUser from "@/lib/useUser";
import { useRouter } from "next/navigation";
import React from "react";

interface WishlistCartCheckoutButtonProps {
  uuid: string;
}

const WishlistCartCheckoutButton = ({
  uuid,
}: WishlistCartCheckoutButtonProps) => {
  const router = useRouter();
  const { user } = useUser();

  return user ? (
    <Button
      className="w-full mt-4"
      onClick={() => router.push(`/bazar/checkout/?uuid=${uuid}`)}
    >
      Proceed to Checkout
    </Button>
  ) : (
    <UnAuthenticatedModal>
      <Button className="w-full mt-4">Proceed to Checkout</Button>
    </UnAuthenticatedModal>
  );
};

export default WishlistCartCheckoutButton;
