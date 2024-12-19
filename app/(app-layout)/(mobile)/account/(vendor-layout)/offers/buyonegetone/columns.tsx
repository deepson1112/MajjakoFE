"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { EditDepartmentModal } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/departments/EditDepartmentModal";
import { Category } from "@/lib/validators/fooditems";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface BuyOneGetOneOffer {
  item: string;
  category: string;
  current_price: string;
}

export const columns: ColumnDef<BuyOneGetOneOffer>[] = [
  {
    accessorKey: "item",
    header: "Items",
  },
  {
    accessorKey: "category",
    header: "Category",
    // cell: ({ row }) => {
    //   const isRestricted = row.getValue("age_restriction");

    //   return isRestricted ? (
    //     <span className="bg-brand text-xs font-semibold rounded-full px-2 py-[1px] text-white">
    //       Age Restricted
    //     </span>
    //   ) : null;
    // },
  },
  {
    accessorKey: "current_price",
    header: "Current Price",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const items = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end" className="w-16">
  //           <DropdownMenuLabel className="text-center">
  //             Actions
  //           </DropdownMenuLabel>
  //           {/* <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(`${items.id}`)}
  //           >
  //             Copy items ID
  //           </DropdownMenuItem> */}
  //           <DropdownMenuSeparator />
  //           <Button variant={"ghost"} className="w-full mr-auto">
  //             View Detail
  //           </Button>
  //           <EditDepartmentModal items={items} />
  //           {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
  //           <DeleteConfirmation
  //             id={items.id}
  //             url="/menu/vendor-department/"
  //             deleteTitle="department"
  //             tag="vendor-department"
  //           />
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
