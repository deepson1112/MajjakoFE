"use client";

import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CouponType } from "@/lib/validators/coupon";
import { isoDateConverter } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { EditDepartmentModal } from "../menu-builder/departments/EditDepartmentModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import EditCoupon from "./EditCoupon";
import { DisableOffersModal } from "@/components/DisableOffersModal";

export interface BuyOneGetOneOffer {
  item: string;
  category: string;
  current_price: string;
}

export const columns: ColumnDef<CouponType>[] = [
  {
    accessorKey: "coupons_title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "coupon_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "coupon_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "discount_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const discountAmt = row.getValue("discount_amount");
      const discount_percentages = row.original.discount_percentages;
      const type = row.getValue("coupon_type");

      return (
        <div>
          {type === "Percentage Off"
            ? `${discount_percentages}%`
            : type === "Flat Discount"
            ? `$${discountAmt}`
            : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Starting Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateIso = row.getValue("start_date");

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
          Ending Date
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
            <EditCoupon id={items.id!} is_retail />

            <DropdownMenuSeparator />
            <DisableOffersModal
              disableTitle={items.coupons_title}
              id={items.id!}
              url="/retail-offers/disable-retail-coupon/"
              tag="coupon"
            />
            {/* <DeleteConfirmation
              id={items.id!}
              url="/retail-offers/retail-coupon/"
              deleteTitle="Coupon"
              tag="coupon"
            /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
