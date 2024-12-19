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
import { capitalizeWord, isoDateConverter } from "@/lib/utils";
import { Review } from "../ProductReviews";
import ProductRatings from "../../../bazar/(products)/products/[subCategoryId]/[productId]/ProductsRatings";
import { ReplyReview } from "../ReplyReview";

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "ordered_product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.ordered_product.product_name}</div>;
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>{`${capitalizeWord(row.original.user.first_name)} ${capitalizeWord(
          row.original.user.last_name
        )}`}</div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ratings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.original.rating as number;

      return <ProductRatings sm rating={rating} />;
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
          Reviewed At
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
    id: "actions",
    cell: ({ row }) => {
      const items = row.original;

      return (
        <div className="space-x-2">
          <ReplyReview {...items} />

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

              {/* <EditDepartmentModal items={items} />
            <DeleteConfirmation
              id={items.id!}
              url="/menu/vendor-department/"
              deleteTitle="department"
              tag="vendor-department"
            /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
