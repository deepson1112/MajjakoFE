import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { capitalizeWord, cn } from "@/lib/utils";
import { OrderAddressType } from "@/lib/validators/user";
import { CheckoutLocation } from "@/types";
import { Pencil, Phone } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function MobileDeliveryAddresses({
  userLocation,
  setLocation,
  location,
}: {
  userLocation: OrderAddressType;
  setLocation: Dispatch<SetStateAction<CheckoutLocation | undefined>>;
  location: CheckoutLocation | undefined;
}) {
  // const [selectedValue, setSelectedValue] = useState<string>("");

  // console.log("This is userlocatoin location", userLocation, location);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedValue(event.target.value);
    setLocation(JSON.parse(event.target.value));
  };

  return (
    <form>
      <Carousel
        className="w-full"
        opts={{
          dragFree: true,
        }}
      >
        <CarouselContent>
          <CarouselItem className="basis-[85%] h-[130px]">
            <input
              name="mobile-delivery-locations"
              id="default-address"
              value={JSON.stringify(userLocation.default_address)}
              type="radio"
              className="hidden"
              onChange={handleChange}
            />
            <label htmlFor="default-address" className="block h-full">
              <div
                className={cn(
                  `${location?.id}` === "default address"
                    ? "border border-brand"
                    : "",
                  "bg-[#ffedea] rounded-lg p-4 h-full"
                )}
              >
                <div className="space-y-2 h-full">
                  <div className="flex items-start justify-between">
                    <h6 className="font-semibold">
                      {capitalizeWord(userLocation?.default_address?.address)}
                    </h6>
                    <button className="flex items-center gap-1 rounded-full border border-brand px-2 text-brand">
                      <span className="text-xs">Edit</span>
                      <Pencil
                        className="w-3 h-3"
                        fill="#ff4500"
                        stroke="#ff4500"
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {capitalizeWord(
                        userLocation?.default_address?.first_name
                      )}{" "}
                      {capitalizeWord(userLocation?.default_address?.last_name)}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="w-4 h-4" fill="#F04923" stroke="" />
                      <span className="text-sm">
                        {userLocation?.default_address?.phone_number}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </CarouselItem>

          {userLocation.billing_address.map((address, index) => (
            <CarouselItem key={index} className="basis-[85%] h-[130px]">
              <input
                type="radio"
                className="hidden"
                name="mobile-delivery-locations"
                id={`billing-address-${index}`}
                value={JSON.stringify(address)}
                onChange={handleChange}
              />
              <label htmlFor={`billing-address-${index}`}>
                <div
                  className={cn(
                    `${location?.id}` === `${address.id}`
                      ? "border border-brand"
                      : "",
                    "bg-[#ffedea] rounded-lg p-4 h-full"
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h6 className="font-semibold line-clamp-2">
                        {address.address}
                      </h6>
                      <button className="flex items-center gap-1 rounded-full border border-brand px-2 text-brand">
                        <span className="text-xs">Edit</span>
                        <Pencil
                          className="w-3 h-3"
                          fill="#ff4500"
                          stroke="#ff4500"
                        />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {capitalizeWord(address?.first_name)}{" "}
                        {capitalizeWord(address?.last_name)}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-4 h-4" fill="#F04923" stroke="" />
                        <span className="text-sm">{address.phone_number}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </form>
  );
}
