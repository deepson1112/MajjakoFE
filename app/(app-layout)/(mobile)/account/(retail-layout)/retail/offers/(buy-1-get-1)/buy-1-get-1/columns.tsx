"use client";

import { Button } from "@/components/ui/Button";
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
import { DisableOffersModal } from "@/components/DisableOffersModal";
import { isoDateConverter } from "@/lib/utils";
import { BuyOneGetOneRetail } from "../..";
import { EditRetailBuyOneGetOne } from "./EditRetailBuyOneGetOne";

type offerItemsType = {
  item_id: number;
  item_name: string;
};

export interface PercentOfResponseType {
  active: boolean;
  audience: string;
  created_by: number;
  created_date: string;
  discount_banner: string;
  end_date: string;
  id: number;
  item: offerItemsType[] | null;
  start_date: string;
  vendor: number;
}

export const columns: ColumnDef<BuyOneGetOneRetail>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "retail_products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Offered Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const productsOffered: Array<{
        product_name: string;
        product_id: number;
      }> = row.getValue("retail_products");
      const products = productsOffered
        .map((item) => item.product_name)
        .join(", ");

      return <p className="max-w-xs">{products}</p>;
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
      const isActive = row.getValue("active");

      return isActive ? (
        <span className="bg-green-500 text-xs font-semibold rounded-full px-2 py-[1px] text-white">
          Active
        </span>
      ) : (
        <span className="bg-red-500 text-xs font-semibold rounded-full px-2 py-[1px] text-white">
          Disabled
        </span>
      );
    },
  },
  {
    accessorKey: "audience",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Audience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateIso = row.getValue("created_date");

      const { day, month, year } = isoDateConverter(dateIso as string);
      return <div>{`${year}/${month}/${day}`}</div>;
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateIso = row.getValue("end_date");

      const { day, month, year } = isoDateConverter(dateIso as string);
      return <div>{`${year}/${month}/${day}`}</div>;
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
            <EditRetailBuyOneGetOne offer_id={items.id} items={items} />
            <DisableOffersModal
              disableTitle={"Buy One Get One"}
              tag={"retail-buy-one-get-one"}
              url={"/retail-offers/disable-retail-get-one-free-offer/"}
              id={items.id!}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
