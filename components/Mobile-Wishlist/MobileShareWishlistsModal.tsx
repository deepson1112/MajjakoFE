import { MobileDeliveryLocation } from "@/app/(app-layout)/(mobile)/bazar/checkout/mobile/MobileDeliveryLocation";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import useUser from "@/lib/useUser";
import { CheckoutLocation } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

type ShareWishlistItems = CheckoutLocation & {
  wishlists: number[];
};

export function MobileShareWishlistsModal({ items }: { items: number[] }) {
  const { user } = useUser();
  const [location, setLocation] = useState<CheckoutLocation>();
  const [mobileDevliveryLocation, setMobileDeliveryLocation] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleShareWishlist = () => {
    console.log("This is location", location);

    handleShareWishlistsFn({
      ...location!,
      email: user?.email,
      wishlists: items,
    });
  };

  const {
    mutate: handleShareWishlistsFn,
    isLoading: handleShareWishlistsFnLoader,
  } = useMutation({
    mutationFn: async (data: ShareWishlistItems) => {
      console.log("Mutate", data);
      const response = await api()
        .post(data, `/retail-wishlist/share-retail-wishlist/`)
        .json<{ uuid: string }>();
      return response;
    },
    onSuccess: (data: { uuid: string }) => {
      // toast.success("Sucessfully added location");
      navigator.clipboard.writeText(
        `https://majjakodeals.com/bazar/wishlists-buyer/${data.uuid}`
      );
      toast.info("The shared link has been copied to your clipboard");
      setIsAddressModalOpen(false);

      queryClient.invalidateQueries("delivery-address");
      queryClient.invalidateQueries("/retail-wishlist/retail-wishlist/");
    },
    onError: (error: any) => {
      toast.error(`Unable to wishlist`, {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
      <DialogTrigger asChild>
        <Button disabled={!items.length}>
          {items.length ? "Share" : "No items selected"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Wishlist</DialogTitle>
          <DialogDescription>
            Choose your delivery location for those items to be delivered.
          </DialogDescription>
        </DialogHeader>
        <div>
          <MobileDeliveryLocation
            location={location}
            setLocation={setLocation}
            mobileDeliveryLocation={mobileDevliveryLocation}
            setMobileDeliveryLocation={setMobileDeliveryLocation}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => handleShareWishlist()}
            isLoading={handleShareWishlistsFnLoader}
            disabled={handleShareWishlistsFnLoader}
          >
            Share Wishlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
