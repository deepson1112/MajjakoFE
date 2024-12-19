"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { DisableCategories } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/modify-categories/DisableCategories";
import { EnableCategories } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/modify-categories/EnableCategoires";
import { OfferCategory } from "../add-product-offer-category/AddProductOfferCategory";
import EditTrigger from "./EditTrigger";

export const columns: ColumnDef<OfferCategory>[] = [
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
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cateogry Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category_description",
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
      return (
        <span className=" text-xs line-clamp-1">
          {row.original.category_description}
        </span>
      );
    },
  },

  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. of products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className=" text-xs line-clamp-1">
          {!!row.original.products ? row.original.products.length : 0}
        </span>
      );
    },
  },

  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("active") as boolean;

      return status ? (
        <div>
          <span className="bg-green-500 text-white rounded-full font-semibold px-2">
            Active
          </span>
        </div>
      ) : (
        <div>
          <span className="bg-red-500 text-white rounded-full font-semibold px-2">
            Disabled
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const items = row.original as OfferCategory;

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

            <EditTrigger items={items} />

            {items.active ? (
              <DisableCategories
                disableTitle={items.category_name || "cateogry"}
                id={items.id!}
                tag="offer-cateogry"
              />
            ) : (
              <EnableCategories
                disableTitle={items.category_name || "cateogry"}
                id={items.id!}
                tag="offer-cateogry"
                url="/retail-offers/vendor/enable_offer_category/"
              />
            )}
            <DeleteConfirmation
              id={items.id!}
              url="/retail-offers/vendor/offer_category/"
              deleteTitle="category"
              tag="offer-cateogry"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
