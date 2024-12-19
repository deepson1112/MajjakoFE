"use client";

import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { isoDateConverter } from "@/lib/utils";
import Link from "next/link";
import { VendorOrderType } from "@/lib/validators/vendororder";

export const columns: ColumnDef<VendorOrderType>[] = [
  {
    accessorKey: "vendor_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="w-[190px]">{row?.original?.vendor_name}</p>
    ),
  },
  {
    id: "grand_total ",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total($)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p>{row.original.grand_total}</p>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateIso = row.getValue("created_at");

      const { day, month, year } = isoDateConverter(dateIso as string);
      return <div>{`${year}/${month}/${day}`}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        className="active:scale-95 p-2 inline-flex items-center justify-center rounded-md text-sm font-medium bg-brand text-white hover:bg-brand_hover transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        href={`orders/${row.original.id}`}
      >
        Invoice
      </Link>
    ),
  },
];
