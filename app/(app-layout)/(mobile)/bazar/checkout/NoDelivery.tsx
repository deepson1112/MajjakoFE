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
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export function NoDelivery({
  isDeliveryAvailable,
  setIsDeliveryAvailable,
  setMobileDeliveryLocation,
  mobileDeliveryLocation,
}: {
  isDeliveryAvailable: boolean;
  setIsDeliveryAvailable: Dispatch<SetStateAction<boolean>>;
  setMobileDeliveryLocation?: Dispatch<SetStateAction<boolean>>;
  mobileDeliveryLocation?: boolean;
}) {
  console.log(
    "From here",
    setMobileDeliveryLocation && !mobileDeliveryLocation
  );
  return (
    <Dialog open={isDeliveryAvailable} onOpenChange={setIsDeliveryAvailable}>
      <DialogContent
        className="sm:max-w-[500px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>No Delivery Available</DialogTitle>
          <DialogDescription>
            The current location doesnot include in the delivery zone of this
            product.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 my-4">
          <Image
            src={"/delivery/no-truck.png"}
            alt="no-truck-image"
            height={512}
            width={512}
            className="h-36 w-36 object-center object-cover"
          />
          <h3 className="font-bold text-brand text-xl">
            Delivery Not Available
          </h3>
          <p className="text-center text-sm ">
            Your current location is out of our{" "}
            <span className="text-brand">delivery zone</span>. Please try
            changing your delivery address or wait till we expand our delivery
            zone.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsDeliveryAvailable((prev) => !prev);
              if (setMobileDeliveryLocation && !mobileDeliveryLocation) {
                setMobileDeliveryLocation((prev) => !prev);
              }
            }}
          >
            Change Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
