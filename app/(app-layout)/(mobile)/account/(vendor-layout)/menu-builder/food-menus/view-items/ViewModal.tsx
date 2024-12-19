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
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { dateConvert } from "@/lib/utils";
import { FoodItem, foodItemResponse } from "@/lib/validators/fooditems";
import Image from "next/image";

interface ViewModalProps {
  items: foodItemResponse;
}

export function ViewModal({ items }: ViewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[650px] p-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="py-8 px-3 flex justify-between gap-6">
          {items.image ? (
            <div className="hidden sm:grid">
              <Image
                height={1080}
                width={1080}
                src={items.image}
                className="w-64 h-full object-center object-cover rounded-lg"
                alt="Food image"
                placeholder="blur"
                blurDataURL={items.image}
              />
            </div>
          ) : null}
          <div className="flex-1">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {" "}
                {items.food_title}
              </DialogTitle>
              <p className="text-xs text-gray-600 font-semibold">
                {items.description}
              </p>
            </DialogHeader>
            <div className="pb-6 border-b-2 border-gray-100">
              <p className="text-xs font-semibold">
                Created At: {dateConvert(items.created_at)}
              </p>
              <p className="text-xs font-semibold">
                Last Updated At: {dateConvert(items.updated_at)}
              </p>
            </div>
            <ul className="py-2">
              <h6 className="font-semibold">Available Addons</h6>

              {items?.food_addons &&
                items.food_addons.map((addon) => (
                  <li
                    className="text-base font-medium border-b-2 border-gray-50"
                    key={addon.id}
                  >
                    {addon.add_on_category}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
