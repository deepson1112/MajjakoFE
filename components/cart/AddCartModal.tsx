import { Button } from "@/components/ui/Button";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import CartCounterAndButtonsAddCart, {
  CustomizationSetResponse,
} from "./CartcounterAndButtonsAddCart";
import { CartCounterAndButtonsProps } from "@/types";
import { Dispatch, SetStateAction } from "react";

export function AddCartModal({
  addons,
  foodTitle,
  fooditem,
  setOpenGlobal,
}: {
  addons: CustomizationSetResponse[];
  foodTitle: string;
  fooditem: number;
  setOpenGlobal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1">Add new</Button>
      </DialogTrigger>
      <CartCounterAndButtonsAddCart
        addons={addons}
        foodTitle={foodTitle}
        fooditem={fooditem}
        setOpenGlobal={setOpenGlobal}
      />
    </Dialog>
  );
}
