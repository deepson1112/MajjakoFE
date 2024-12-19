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
import { EditCategoryModal } from "./EditCategoryModal";
import { Category } from "@/lib/validators/fooditems";
import { DisableCategories } from "./DisableCategories";
import { EnableCategories } from "./EnableCategoires";

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: "age_restriction",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age Restriction
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isRestricted = row.getValue("age_restriction");

      return isRestricted ? (
        <span className="bg-brand text-xs font-semibold rounded-full px-2 py-[1px] text-white">
          Age Restricted
        </span>
      ) : null;
    },
  },
  {
    accessorKey: "tax_rate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tax Rate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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

            <EditCategoryModal items={items} />

            {items.active ? (
              <DisableCategories
                disableTitle={items.category_name || "cateogry"}
                id={items.id!}
                tag="vendor-category"
              />
            ) : (
              <EnableCategories
                disableTitle={items.category_name || "cateogry"}
                id={items.id!}
                tag="vendor-category"
                url="/menu/enable-vendor-category/"
              />
            )}
            <DeleteConfirmation
              id={items.id!}
              url="/menu/vendor-category/"
              deleteTitle="category"
              tag="vendor-category"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
