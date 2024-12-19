import { SelectItem } from "@/components/ui/Select";
import React, { useState } from "react";
import { DepartmentComboboxFormProps } from "../../categories/add-category/DepartmentComboBox";
import {
  Category,
  Product,
  ProductVariation,
} from "@/lib/validators/fooditems";
import { UseFormReturn } from "react-hook-form";
import { ProductVariationType } from "../customization/TabsContent";

interface SelectItemsProps extends ProductVariationType {
  form: UseFormReturn<ProductVariation>;
  index: number;
}

const SelectItems = ({ form, name, id, index }: SelectItemsProps) => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <SelectItem value={`${id}`} key={id} onChange={(e) => console.log(e)}>
      {name}
    </SelectItem>
  );
};

export default SelectItems;
