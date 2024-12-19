"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import {
  DepartmentComboboxFormProps,
  DepartmentComboBox,
} from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/add-category/DepartmentComboBox";
import { api } from "@/lib/fetcher";
import { Skeleton } from "./ui/Skeleton";
import { HoursSchedule } from "./HoursSchedule";
import { VendorTimelineType } from "@/types";
import { Category, categorySchema } from "@/lib/validators/fooditems";
import { toast } from "sonner";

interface Props {
  vendor_id: string;
}

const AddCategoryForm = ({ vendor_id }: Props) => {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
      category_description: null,
      age_restriction: false,
      tax_exempt: false,
      tax_rate: undefined,
      department: "",
    },
  });

  const watchTaxRate = form.watch("tax_exempt");
  const router = useRouter();

  const { mutate: handleAddCategoryFn, isLoading: handleAddCategoryFnLoder } =
    useMutation({
      mutationFn: async (payload: Category) => {
        const data = api().post(payload, "/menu/vendor-category/").json();
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully Added New Category");
        queryClient.invalidateQueries("vendor-department");
        form.reset({
          category_name: "",
          category_description: "",
          age_restriction: false,
          tax_exempt: false,
          tax_rate: undefined,
          department: "",
        });
        form.setValue("tax_rate", undefined);
        form.setValue("tax_exempt", false);
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to Add New Category", {
          description: "Please try again later",
        });
      },
    });

  const { data, isLoading: departmentLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/menu/vendor-department/?vendor=${vendor_id}`)
        .json();
      return response;
    },
    queryKey: ["vendor-department"],
    onError: (error) => {
      console.log(error);
      toast.error("Issue while fetching Departmets", {
        description: "Please Try Again",
      });
    },
  });

  const handleAddCategory = (data: Category) => {
    handleAddCategoryFn({ ...data, vendor: vendor_id });
    console.log(data);
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleAddCategory)}
        >
          {departmentLoader ? (
            <Skeleton className="w-80 h-[40px]" />
          ) : (
            !!data && (
              <DepartmentComboBox
                data={data as DepartmentComboboxFormProps[]}
                form={form}
              />
            )
          )}
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Category Name"
                      className="bg-gray-100 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex sm:flex-row flex-col items-stretch sm:items-end gap-6">
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
                    <FormControl className="bg-gray-100 border-none">
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
                        className="bg-gray-100 border-none"
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
            name="category_description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Description of the food"
                      className="resize-none bg-gray-100 border-none"
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

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

          <Button
            className="self-start"
            isLoading={handleAddCategoryFnLoder}
            disabled={handleAddCategoryFnLoder}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCategoryForm;
