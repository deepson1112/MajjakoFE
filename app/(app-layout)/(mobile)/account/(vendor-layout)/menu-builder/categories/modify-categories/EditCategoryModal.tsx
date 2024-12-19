import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  DepartmentComboBox,
  DepartmentComboboxFormProps,
} from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/add-category/DepartmentComboBox";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import { Category, categorySchema } from "@/lib/validators/fooditems";
import { VendorTimelineType } from "@/types";
import { HoursSchedule } from "@/components/HoursSchedule";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditCateogry {
  items: Category;
}

export function EditCategoryModal({ items }: EditCateogry) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: `${items.category_name}`,
      category_description: items.category_description
        ? `${items.category_description}`
        : null,
      age_restriction: items.age_restriction,
      tax_exempt: items.tax_exempt,
      tax_rate: items?.tax_rate ? `${items.tax_rate}` : undefined,
      department: `${items.department}`,
      vendor: `${items.vendor}`,
    },
  });

  const { data: timelines, isLoading: timelinesLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get("/vendor/vendor-timelines").json();
      return response as VendorTimelineType[];
    },
    queryKey: ["vendor-timelines"],
  });

  const watchTaxRate = form.watch("tax_exempt");
  const router = useRouter();

  const {
    mutate: handleUpdateCategoryFn,
    isLoading: handleUpdateCategoryFnLoader,
  } = useMutation({
    mutationFn: async (payload: Category) => {
      // const { data } = await axiosInstance.post(
      //   "/menu/vendor-category/",
      //   payload,
      //   { headers: { "Content-Type": "application/json" } }
      // );
      const data = api()
        .patch(payload, `/menu/vendor-category/${items.id}/`)
        .json();
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully Update Category");
      queryClient.invalidateQueries("vendor-department");
      router.refresh();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to Update Category", {
        description: "Please try again later",
      });
    },
  });

  const { data, isLoading: departmentLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/menu/vendor-department/`)
        // .get(`/menu/vendor-department/?vendor=${vendor_id}`)
        .json();
      return response;
    },
    queryKey: ["vendor-department"],
    onError: (error) => {
      console.error(error);
    },
  });

  const handleUpdateCategory = (data: Category) => {
    handleUpdateCategoryFn({ ...data });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[800px] p-8"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click save changes when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] px-4">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateCategory)}
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
                        defaultValue={items.tax_exempt ? "1" : "0"}
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
                        {/* @ts-ignore */}
                        <Textarea
                          {...field}
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

              {timelinesLoader ? (
                <Skeleton className="h-8 w-full rounded-md" />
              ) : timelines?.length ? (
                <HoursSchedule form={form} timelines={timelines} />
              ) : null}

              <Button
                type="submit"
                className="self-end"
                isLoading={handleUpdateCategoryFnLoader}
                disabled={handleUpdateCategoryFnLoader}
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </ScrollArea>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
