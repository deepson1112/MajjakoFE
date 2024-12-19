"use client";

import { Category } from "@/lib/validators/fooditems";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button, buttonVariants } from "../../ui/Button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Switch } from "../../ui/Switch";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CategoriesList = ({
  age_restriction,
  category_name,
  id,
  tax_rate,
  tax_exempt,
  vendor,
  category_description,
  department,
}: Category) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const categorySchema = z.object({
    category_name: z.string(),
    tax_rate: z.string().optional(),
    tax_exempt: z.boolean(),
    age_restriction: z.boolean(),
    category_description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: category_name,
      tax_rate: tax_rate ? `${tax_rate}` : undefined,
      tax_exempt: tax_exempt,
      age_restriction: age_restriction,
      category_description: category_description || undefined,
    },
  });

  const watchTaxRate = form.watch("tax_exempt");

  const { mutate: handleDeleteDepartment, isLoading: deleteButtonLoader } =
    useMutation<Response, AxiosError, unknown>({
      mutationFn: async () => {
        const { data } = await axiosInstance.delete(
          `/menu/vendor-category/${id}/`
        );
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully Deleted Category");
        queryClient.invalidateQueries("vendor-category");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to Delete Category", {
          description: "Please try again later",
        });
      },
    });

  const { mutate: handleUpdateCategoryFn, isLoading } = useMutation<
    Response,
    AxiosError,
    z.infer<typeof categorySchema>
  >({
    mutationFn: async (payload) => {
      console.log("Payload", payload);
      const { data } = await axiosInstance.patch(
        `/menu/vendor-category/${id}/`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully Activated Account");
      queryClient.invalidateQueries("vendor-department");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to activate user", {
        description: "Please try again later",
      });
    },
  });

  const handleUpdateCategory = (data: z.infer<typeof categorySchema>) => {
    handleUpdateCategoryFn({
      ...data,
      category_description: data.category_description?.length
        ? data.category_description
        : undefined,
    });
  };

  return (
    <>
      <li className="p-3 flex items-center justify-between border-2 rounded-md border-gray-100 cursor-pointer hover:border-gray-200">
        <h4>{category_name}</h4>

        <div className="flex items-center gap-2">
          <Link
            href={`/account/menu-builder/category/${category_name?.replace(
              " ",
              "-"
            )}/${id}/${vendor}/${department}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-gray-100 text-black hover:bg-gray-200"
            )}
          >
            View Foods
          </Link>

          <Button
            className=" bg-red-200 rounded-sm hover:bg-red-300"
            onClick={() => setOpenAlert(true)}
          >
            <Trash2 className="text-red-500 w-4 h-4" />
          </Button>
          <Button
            className=" bg-blue-200 rounded-sm hover:bg-blue-300"
            onClick={() => setOpenDialog(true)}
          >
            <Pencil className="text-blue-500 w-4 h-4" />
          </Button>
        </div>
      </li>

      {/* dialog for deletion */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              <span className="text-brand">category</span> including all the
              caetogories and food items.
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

      {/* Dialg for update */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription>
              You can add Categories for better inventory management.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateCategory)}
              className="py-4 flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
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
                name="category_description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          defaultValue={field?.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="tax_exempt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tax Rate (Does the category includes tax?)
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
                            disabled={!watchTaxRate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="age_restriction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Age Restriction</FormLabel>
                      <FormDescription>
                        Does the category have age restriction for certain age
                        group?
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

export default CategoriesList;
