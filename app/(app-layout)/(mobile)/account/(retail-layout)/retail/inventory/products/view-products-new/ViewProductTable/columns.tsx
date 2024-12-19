"use client";

import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";

import Image from "next/image";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import Link from "next/link";
import { NestedProduct } from "@/types";

export const columns: ColumnDef<NestedProduct>[] = [
  {
    accessorKey: "default_image",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Info
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product_name = row.original.name;
      const image = row.original.default_image || row.original.image_1 || "";
      const description = row.original.description;

      return (
        <div className="flex items-start gap-6">
          <Image
            src={image}
            alt={`${product_name}-image`}
            width={100}
            height={100}
            className="w-24 aspect-square object-center object-cover rounded-lg"
          />
          <div>
            <h5 className="font-semibold">{product_name}</h5>
            <p className="max-w-[15rem] line-clamp-2 text-xs text-gray-500">
              {description}
            </p>
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "variations",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Variations
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const variationsLength = row.original.products_variations_detail.length;

  //     return <div>{variationsLength}</div>;
  //   },
  // },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original.category;

      return <div>{category}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = row.original.products_variations_detail[0]?.stock_quantity;
      return <div>{stock}</div>;
    },
  },
  {
    accessorKey: "completed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Completed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { is_complete } = row.original;
      return is_complete ? (
        <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-1">
          Complete
        </span>
      ) : (
        <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-1">
          Incomplete
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const product_name = row.original.name;

      return (
        <div className="flex items-center gap-6">
          <Link
            href={`/account/retail/inventory/products/view-products-new/${id}/`}
          >
            <Pencil className="w-4 h-4" />
          </Link>

          <DeleteConfirmation
            deleteTitle={product_name}
            id={id}
            tag="retail-nested-products-incomplete"
            tag2="retail-nested-products-complete"
            url="/retails/product/"
            icon
          />
        </div>
      );
    },
  },
];
