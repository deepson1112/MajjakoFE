import { FoodAddonType } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/food-menus/customization/columns";
import { FormLabel } from "../../ui/Form";
import { Checkbox } from "../../ui/Checkbox";
import { Label } from "../../ui/Label";

const FoodAddonsList = ({ add_on_category, select_type }: FoodAddonType) => {
  return (
    <div className="flex flex-row items-center space-x-3 space-y-0">
      <Checkbox />
      <Label className="text-sm font-normal">{add_on_category}</Label>
    </div>
  );
};

export default FoodAddonsList;
