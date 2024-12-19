import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { formSchemaType } from "./CartcounterAndButtonsAddCart";

interface MultipleSelectionItemQuantityProps {
  form: UseFormReturn<formSchemaType>;
  customization: number;
}

enum changeType {
  DECREMENT,
  INCREMENT,
}

const MultipleSelectionItemQuantity = ({
  form,
  customization,
}: MultipleSelectionItemQuantityProps) => {
  console.log("I am at Multiple Selection Item");

  const prevValues = form.getValues("cart_addons");
  const [selectionQuantity, setSelectionQuantity] = useState(0);

  const handleQuantityChange = (type: changeType) => {
    if (type === changeType.DECREMENT) {
      if (selectionQuantity > 0) {
        setSelectionQuantity((prev) => prev - 1);
      }
    }
    if (type === changeType.INCREMENT) {
      setSelectionQuantity((prev) => prev + 1);
    }
    const isExist = prevValues?.filter(
      (value) => value.customization === customization
    );
    console.log("isExist", isExist);
    if (isExist && !!isExist.length) {
      form.setValue(
        "cart_addons",
        prevValues?.map((value) =>
          value.customization === customization
            ? { ...value, quantity: selectionQuantity }
            : value
        )
      );
    } else {
      console.log("Is not exists");
      prevValues?.push({
        quantity: selectionQuantity,
        customization,
      });
      console.log("prevalues", prevValues);
      // form.setValue("cart_addons", newValues);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 px-2 rounded-full gap-2 ">
      <button
        type="button"
        className="bg-gray-200 rounded-full text-gray-600 w-5 h-5 flex items-center justify-center"
        onClick={() => handleQuantityChange(changeType.DECREMENT)}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span>{selectionQuantity}</span>
      <button
        type="button"
        className="bg-gray-900 rounded-full text-white w-5 h-5 flex items-center justify-center"
        onClick={() => handleQuantityChange(changeType.INCREMENT)}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MultipleSelectionItemQuantity;
