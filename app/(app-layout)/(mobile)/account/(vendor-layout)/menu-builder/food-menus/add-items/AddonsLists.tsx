import { capitalizeWord } from "@/lib/utils";
import { Minus } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface AddonsListsProps {
  department_name: string;
  id: number;
  setCurrentAddons: Dispatch<SetStateAction<number[]>>;
  removeCheckedValue: (id: number) => void;
}

const AddonsLists = ({
  department_name,
  id,
  setCurrentAddons,
  removeCheckedValue,
}: AddonsListsProps) => {
  return (
    <li className="flex items-center gap-3 py-3 px-4 w-full bg-gray-50 rounded-full flex-nowrap line-clamp-1">
      <p className="flex items-center justify-between w-full whitespace-nowrap truncate">
        {capitalizeWord(department_name)}
      </p>

      <button>
        <Minus
          onClick={() => {
            setCurrentAddons((prev) => prev.filter((item) => item !== id));
            removeCheckedValue(id);
          }}
          className="w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full"
        />
      </button>
    </li>
  );
};

export default AddonsLists;
