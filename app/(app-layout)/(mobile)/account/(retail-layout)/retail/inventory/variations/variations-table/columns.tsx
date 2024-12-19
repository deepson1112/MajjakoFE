"use client";

import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { ProductVariationType } from "@/lib/validators/fooditems";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";

import EditProductVariationType from "../EditProductVariationType";
import AddVariation from "../AddVariation";

type offerItemsType = {
  category: number | null;
  discount_percentages: number;
  id: number;
  item: number | null;
  store_offer: number;
};

export interface PercentOfResponseType {
  active: boolean;
  audience: string;
  created_by: number;
  created_date: string;
  discount_banner: string;
  end_date: string;
  id: number;
  offer_items: offerItemsType[];
  start_date: string;
  vendor: number;
}

export const columns: ColumnDef<ProductVariationType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variation Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description = row.getValue("description") as string;

      return (
        <span className="rounded-full px-2 py-[1px] line-clamp-1">
          {description}
        </span>
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
            <EditProductVariationType id={items.id!} />
            <AddVariation id={items.id!} />
            <DeleteConfirmation
              id={items.id!}
              url="/retails/retail-variation-types/"
              deleteTitle="variation type"
              tag="product-variation-type"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
