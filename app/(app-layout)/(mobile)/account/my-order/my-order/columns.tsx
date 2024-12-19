"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ScrollText, StickyNote } from "lucide-react";
import { cn, isoDateConverter } from "@/lib/utils";
import { OrderDetails } from "@/types";
import Link from "next/link";

export const columns: ColumnDef<OrderDetails>[] = [
  {
    accessorKey: "order_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const first_name = row.getValue("first_name") as string;

      return (
        <div>{first_name?.charAt(0)?.toUpperCase() + first_name?.slice(1)}</div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      <div className="flex items-center gap-4">
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href={`/account/my-order/${row.original.id}`}
        >
          Track
        </Link>

        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "border-brand bg-white text-brand outline-none outline"
          )}
          href={`/account/my-order/${row.original.id}`}
        >
          Invoice
        </Link>
      </div>
    ),
  },
  // {
  //   accessorKey: "delivery_date",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Order For
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const dateIso = row.getValue("delivery_date");

  //     const { day, month, year } = isoDateConverter(dateIso as string);
  //     return <div>{`${year}/${month}/${day}`}</div>;
  //   },
  // },
];
