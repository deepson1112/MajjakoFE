"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ReducedRefund, Refund } from "../RefundedItems";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ReducedRefund>[] = [
  //   {
  //     accessorKey: "refund_products_detail",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Product Name
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //     cell: ({ row }) => (
  //       <p className="w-[190px]">
  //         {
  //           row?.original?.refund_products_detail[0]?.product_variation_detail
  //             ?.product_name
  //         }
  //       </p>
  //     ),
  //   },
  {
    accessorKey: "refund_products_detail",
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
  },
  {
    accessorKey: "reason",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reason
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "refund_id",
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
      return (
        <Link
          href={`/account/refunded/${row.original.refund_id}`}
          className={cn(buttonVariants({ variant: "outline" }), "bg-white")}
        >
          View Details
        </Link>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return row.original.status === "in_review" ? (
  //       <span className="bg-brand text-xs font-semibold rounded-full px-2 py-[1px] text-white">
  //         In Review
  //       </span>
  //     ) : (
  //       <span className="bg-green-500 text-xs font-semibold rounded-full px-2 py-[1px] text-white">
  //         Reviewed
  //       </span>
  //     );
  //   },
  // },
];
