"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "../../ui/Button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/Alert-dialog";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { MoreVertical } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { DepartmentType, departmentSchema } from "@/lib/validators/fooditems";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

const DepartmentList = ({
  department_name,
  tax_rate,
  id,
  tax_exempt,
  age_restriction,
  vendor,
}: DepartmentType) => {
  const form = useForm<DepartmentType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      age_restriction: age_restriction,
      tax_rate: tax_exempt ? tax_rate : undefined,
      tax_exempt: tax_exempt,
      department_name: department_name,
    },
  });

  const watchTaxRate = form.watch("tax_exempt");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { mutate: handleUpdateDepartment, isLoading } = useMutation<
    Response,
    AxiosError,
    DepartmentType
  >({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.put(
        `/menu/vendor-department/${id}/`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully Updated List");
      queryClient.invalidateQueries("vendor-department");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to Update List", {
        description: "Please try again later",
      });
    },
  });

  const { mutate: handleDeleteDepartmentFn, isLoading: deleteButtonLoader } =
    useMutation({
      mutationFn: async () => {
        const { data } = await axiosInstance.delete(
          `/menu/vendor-department/${id}/`
        );
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully Deleted Sub-Category");
        queryClient.invalidateQueries("vendor-department");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to Delete Sub-Category", {
          description: "Please try again later",
        });
      },
    });

  const handleAddDepartment = (data: DepartmentType) => {
    handleUpdateDepartment({ ...data, vendor });
  };

  const handleDeleteDepartment = () => {
    handleDeleteDepartmentFn();
  };

  return (
    <>
      <li className="group hover:bg-gray-100 flex items-center justify-between border-b-2 border-gray-100 p-3">
        <h4 className="flex-1">
          {department_name[0].toUpperCase() + department_name.substring(1)}
        </h4>
        {age_restriction ? (
          <div className="flex-1">
            <span className="bg-brand text-xs font-semibold rounded-full px-2 py-[1px] text-white">
              Age Restricted
            </span>
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <Link
            href={`/account/menu-builder/${department_name.replace(
              " ",
              "-"
            )}/${id}`}
            className={cn(
              buttonVariants(),
              "group-hover:border-2 bg-gray-100 text-black hover:bg-gray-200"
            )}
          >
            View Menu
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </li>

      {/* Alert warning for Deletion */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              category including all the caetogories and food items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDepartment}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialong box for Update */}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Update Sub-Category</DialogTitle>
            <DialogDescription>
              You can update sub-categories for better management of the food
              items.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddDepartment)}
              className="py-4 flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="department_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Sub-Category Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="tax_exempt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tax Rate (Does the sub-category includes tax?)
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e === "1" ? true : false);
                        e === "0" && form.setValue("tax_rate", undefined);
                      }}
                      defaultValue={field.value ? "1" : "0"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Does the category includes tax?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {watchTaxRate ? (
                <FormField
                  control={form.control}
                  name="tax_rate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Tax percentage"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              ) : null}
              <FormField
                control={form.control}
                name="age_restriction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Age Restriction</FormLabel>
                      <FormDescription>
                        Does the sub-category have age restriction for certain
                        age group?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepartmentList;
