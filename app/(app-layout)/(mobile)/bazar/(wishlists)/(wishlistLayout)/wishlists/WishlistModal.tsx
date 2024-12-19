"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { OrderAddressType } from "@/lib/validators/user";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { EditOrderAddress } from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/EditOrderAdress";
import { Fragment, useState } from "react";
import useUser from "@/lib/useUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeliveryAddressModal from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/addOrderLocation";
import { queryClient } from "@/lib/queryClient";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface WishlistModalProps {
  items: number[];
}

export default function WishlistModal({ items }: WishlistModalProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const { register, watch, reset } = useForm({
    defaultValues: {
      defaultLocation: "",
    },
  });

  const selectedValuesString = watch("defaultLocation");

  const { data: deliveryAddressData } = useQuery({
    queryFn: async () => {
      const response = await api().get("/user/user-location/").json();
      return response as OrderAddressType;
    },
    queryKey: ["delivery-address"],
    onSuccess: (data) => {
      reset({
        defaultLocation: JSON.stringify(data?.default_address),
      });
      queryClient.invalidateQueries("retail-shared-wishlists");
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { user, isLoading } = useUser();

  const {
    mutate: handleShareWishlistsFn,
    isLoading: handleShareWishlistsFnLoader,
  } = useMutation({
    mutationFn: async (data: OrderAddressType) => {
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
    },
    onError: (error: any) => {
      toast.error(`Unable to wishlist`, {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleShareWishlist = () => {
    const parsedData = JSON.parse(selectedValuesString);

    handleShareWishlistsFn({
      ...parsedData,
      email: user?.email,
      wishlists: items,
    });
  };

  if (isLoading) return <p>Loading....</p>;

  return (
    <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="mt-2 flex items-center">
          Share <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-6xl overflow-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Share wishlist</DialogTitle>
          <DialogDescription>
            Complete the sharing process by selecting a address
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[66vh]">
          <div className="flex flex-col md:flex-row py-4">
            <form>
              <div className="w-full">
                <div className="px-2">
                  <h6 className="font-semibold mb-1">Saved Addresses</h6>
                  <p className="text-xs mb-3">
                    {" "}
                    You can select any of the address that you have saved
                    previously or add new location.
                  </p>
                </div>
                <div className="max-h-[30rem]  overflow-y-auto scrollBar px-2">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    {!!deliveryAddressData &&
                    !!deliveryAddressData.default_address ? (
                      <Fragment>
                        <label
                          htmlFor={`${deliveryAddressData.default_address.first_name}`}
                          className={`relative block px-6 py-3 bg-white rounded-lg shadow hover:bg-gray-50 ${
                            `${selectedValuesString}` ===
                            `${JSON.stringify(
                              deliveryAddressData.default_address
                            )}`
                              ? "border-2 border-brand"
                              : "border"
                          } space-y-1 h-[130px] truncate cursor-pointer`}
                        >
                          <div className="w-full  flex items-center justify-between p-0">
                            <p>
                              {deliveryAddressData.default_address.first_name
                                .charAt(0)
                                .toUpperCase() +
                                deliveryAddressData.default_address.first_name.slice(
                                  1
                                )}{" "}
                              {deliveryAddressData.default_address.last_name
                                .charAt(0)
                                .toUpperCase() +
                                deliveryAddressData.default_address.last_name.slice(
                                  1
                                )}
                            </p>
                            <EditOrderAddress
                              {...deliveryAddressData.default_address}
                            >
                              <Button
                                type="button"
                                variant={"subtle"}
                                className="text-xs border"
                              >
                                Edit
                              </Button>
                            </EditOrderAddress>
                          </div>
                          {!!deliveryAddressData.default_address
                            ?.phone_number ? (
                            <p className="text-sm">
                              {deliveryAddressData.default_address.phone_number}
                            </p>
                          ) : null}
                          <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
                            {`${
                              !!deliveryAddressData.default_address.state
                                ? deliveryAddressData.default_address.state +
                                  ","
                                : ""
                            }`}
                            {`${
                              !!deliveryAddressData.default_address.city
                                ? deliveryAddressData.default_address.city + ","
                                : ""
                            }`}
                            {`${
                              !!deliveryAddressData.default_address.address
                                ? deliveryAddressData.default_address.address +
                                  ","
                                : ""
                            }`}
                          </p>
                        </label>
                        <input
                          type="radio"
                          className="hidden"
                          id={`${deliveryAddressData.default_address.first_name}`}
                          value={JSON.stringify(
                            deliveryAddressData.default_address
                          )}
                          // value={`${deliveryAddressData.default_address.address}`}
                          {...register("defaultLocation")}
                        />
                      </Fragment>
                    ) : (
                      <div>No Address available</div>
                    )}
                    {!!deliveryAddressData &&
                    deliveryAddressData.billing_address ? (
                      deliveryAddressData.billing_address.map(
                        (deliveryAddress, index) => (
                          <Fragment key={index}>
                            <label
                              htmlFor={`${deliveryAddress.city}+${deliveryAddress.id}`}
                              className={`relative block p-6 bg-white rounded-lg shadow hover:bg-gray-50 ${
                                `${selectedValuesString} + ${index}` ===
                                `${JSON.stringify(deliveryAddress)} + ${index}`
                                  ? "border-2 border-brand"
                                  : "border"
                              } px-6 py-3 space-y-1 h-[130px] cursor-pointer`}
                            >
                              <div className="w-full flex items-center justify-between p-0">
                                <p>
                                  {deliveryAddress?.first_name
                                    ?.charAt(0)
                                    ?.toUpperCase() +
                                    deliveryAddress?.first_name?.slice(1)}{" "}
                                  {deliveryAddress?.last_name
                                    ?.charAt(0)
                                    ?.toUpperCase() +
                                    deliveryAddress?.last_name?.slice(1)}
                                </p>

                                <EditOrderAddress {...deliveryAddress}>
                                  <Button
                                    type="button"
                                    variant={"subtle"}
                                    className="text-xs border"
                                  >
                                    Edit
                                  </Button>
                                </EditOrderAddress>
                              </div>
                              {!!deliveryAddress?.phone_number ? (
                                <p className="text-sm">
                                  {deliveryAddress.phone_number}
                                </p>
                              ) : null}
                              <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
                                {`${
                                  !!deliveryAddress.state
                                    ? deliveryAddress.state + ","
                                    : ""
                                }`}
                                {`${
                                  !!deliveryAddress.city
                                    ? deliveryAddress.city + ","
                                    : ""
                                }`}
                                {`${
                                  !!deliveryAddress.address
                                    ? deliveryAddress.address + ","
                                    : ""
                                }`}
                              </p>
                            </label>
                            <input
                              type="radio"
                              className="hidden"
                              value={JSON.stringify(deliveryAddress)}
                              // value={`${deliveryAddress.city}`}
                              id={`${deliveryAddress.city}+${deliveryAddress.id}`}
                              {...register("defaultLocation")}
                            />
                          </Fragment>
                        )
                      )
                    ) : (
                      <div>No Address available</div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between">
          <DeliveryAddressModal />
          <Button
            type="button"
            onClick={handleShareWishlist}
            isLoading={handleShareWishlistsFnLoader}
            disabled={handleShareWishlistsFnLoader}
          >
            Share my wishlist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
