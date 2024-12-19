"use client";

import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { UserWatchList } from "../../../(products)/products/[subCategoryId]/[productId]/ProductDetail";
import { isoDateConverter } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { CartMutation } from "./cartmutation";
import Image from "next/image";

export const columns: ColumnDef<UserWatchList>[] = [
  {
    accessorKey: "product_variation",
    header: () => {
      return <Button variant="ghost">Image</Button>;
    },
    cell: ({ row }) => {
      const product_image = row.original.product_variation.product_image;

      return (
        <Image
          src={product_image ?? "/final.png"}
          alt="product-image"
          width={1000}
          height={100}
          className="w-20 aspect-[1/1] object-cover object-center rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "product_variation",
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
    cell: ({ row }) => {
      const product_name = row.original.product_variation.product_name;

      return <div>{product_name}</div>;
    },
  },
  {
    accessorKey: "product_variation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.product_variation.price;

      return <div>Rs.{price}</div>;
    },
  },

  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Added on
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const dateIso = row.getValue("created_at");

  //     const { day, month, year } = isoDateConverter(dateIso as string);
  //     return <div>{`${year}/${month}/${day}`}</div>;
  //   },
  // },
  {
    id: "addtocart",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          {" "}
          <Button variant="ghost">Actions</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const items = row.original;

      return (
        <div className="flex items-center justify-center">
          <CartMutation products={items} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const items = row.original;

      return (
        <DeleteConfirmation
          deleteTitle={items.product_variation.product_name}
          id={items.id}
          url="/watchlist/user-watchlist/"
          tag="user-watchlists"
          icon
        />
      );
    },
  },
];
