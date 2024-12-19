"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";
import { AddonsComboBoxForm } from "./AddonsComboBoxForm";
import { FoodAddonType } from "../../menu-builder/food-menus/customization/columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  itemData: FoodAddonType[];
  form: any;
  handleAddNewPromotionItem: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  form,
  itemData,
  handleAddNewPromotionItem,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="relative">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* <TableRow>
              <TableCell className="w-80">
                <AddonsComboBoxForm
                  data={itemData as FoodAddonType[]}
                  form={form}
                  showLabel={false}
                />
              </TableCell>
            </TableRow> */}

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )} 
                    </TableCell>
                  ))} */}
                  <TableRow>
                    <TableCell className="w-72">
                      <div className="flex">
                        <AddonsComboBoxForm
                          data={itemData as FoodAddonType[]}
                          form={form}
                          showLabel={false}
                        />
                        <Button variant={"outline"}>Remove</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Items Selected.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Button
        variant={"subtle"}
        type="button"
        className="mt-4"
        onClick={handleAddNewPromotionItem}
      >
        <Plus className="h-3 w-3" />
        Add
      </Button>
    </>
  );
}
