"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Checkbox } from "@/components/ui/Checkbox";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { EditCustomizationModal } from "./EditCustomizationModal";
import { ExtraOptionType, ProductVariation } from "@/lib/validators/fooditems";
import { EditVariationType } from "./EditVariationType";

export type cusumizationType = {
  id?: string;
  price?: string;
  title?: string;

  customization: ExtraOptionType;
  customization_order: number;
  customization_title: number;
  description: string | null;
  image: string | null;
  maximum_number: number;
  multiple_selection: boolean;
  secondary_customization: boolean;
};

export type FoodAddonType = {
  add_on_category: string;
  customization_set: ExtraOptionType[];
  id: number;
  maximum_quantity: number;
  minimum_quantity: number;
  select_type: string;
};

export const columns: ColumnDef<ProductVariation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // @ts-ignore
      const product = row.original.product_detail.product_name as string;
      return <div>{product}</div>;
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as number;

      return <div>${price}</div>;
    },
  },
  {
    accessorKey: "stock_quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const items = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-16">
            <DropdownMenuLabel className="text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <EditCustomizationModal items={items} /> */}
            <EditVariationType items={items} />
            <DeleteConfirmation
              // @ts-ignore
              id={items.id!}
              url="/retails/retail-products-variation/"
              deleteTitle="variations"
              tag="retail-products-variation"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
