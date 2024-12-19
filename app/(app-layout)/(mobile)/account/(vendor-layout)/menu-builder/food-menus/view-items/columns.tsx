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
import { ViewModal } from "./ViewModal";
import { EditModal } from "./EditModal";
import { foodItemResponse } from "@/lib/validators/fooditems";
type addonsType = {
  add_on_category?: string;
};
export type Payment = {
  created_at: string;
  description: string;
  food_addons: addonsType[];
  food_title: string;
  hours_schedule: number;
  id: number;
  image: string;
  is_available: boolean;
  price: number;
  updated_at: string;
  vendor: number;
  vendor_categories: string[];
};

export const columns: ColumnDef<foodItemResponse>[] = [
  // {
  //   id: "actions",
  //   cell: ({ row }) => <p>{JSON.stringify(row.original())}</p>,
  // },
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
    accessorKey: "food_title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "food_addons",
    header: "Addons",
    cell: ({ row }) => {
      const data: addonsType[] = row.getValue("food_addons");
      return (
        <div className="font-medium">
          {data && !!data.length
            ? data.map((x, i) => <p key={i}>{x.add_on_category + ", "}</p>)
            : "__"}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
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
            <ViewModal items={items} />
            <EditModal items={items} />
            <DeleteConfirmation
              id={items.id}
              url="/menu/add-food-items/"
              deleteTitle="food item"
              tag="food-items-list"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
