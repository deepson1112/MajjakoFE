import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import Breadcrumb from "@/components/ui/Breadcrumb";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import useUser from "@/lib/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";

import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Category,
  DepartmentType,
  departmentSchema,
} from "@/lib/validators/fooditems";

interface EditDepartment {
  items: DepartmentType;
}

export function CartModal() {
  //   const form = useForm<DepartmentType>({
  //     resolver: zodResolver(departmentSchema),
  //     defaultValues: {
  //       ...items,
  //     },
  //   });

  //   const watchTaxRate = form.watch("tax_exempt");
  //   const router = useRouter();

  //   const { mutate: handleUpdateDepartmentFn, isLoading } = useMutation<
  //     Response,
  //     AxiosError,
  //     unknown
  //   >({
  //     // @ts-ignore
  //     mutationFn: async (payload) => {
  //       // @ts-ignore
  //       const data = api()
  //         // @ts-ignore
  //         .patch(payload, `/menu/vendor-department/${items.id}/`)
  //         .json();
  //       return data;
  //     },
  //     onSuccess: () => {
  //       toast({
  //         title: "SucessfullyUpdated Department",
  //         variant: "default",
  //       });
  //       queryClient.invalidateQueries("vendor-department");

  //       router.refresh();
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //       toast({
  //         title: "Failed to Update Department",
  //         description: "Please try again later",
  //         variant: "destructive",
  //       });
  //     },
  //   });

  //   const handleUpdateDepartment = (data: DepartmentType) => {
  //     handleUpdateDepartmentFn({ ...data });
  //     console.log(data);
  //   };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
          //   onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] p-8"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Food Items</DialogTitle>
          <DialogDescription>
            Make changes to your Cart here. Click add new addons or new food.
          </DialogDescription>
        </DialogHeader>
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateDepartment)}
            className="py-4 flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="department_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
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
                    Tax Rate (Does the department includes tax?)
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
                        <SelectValue placeholder="Does the department includes tax?" />
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
                      Does the department have age restriction for certain age
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
              <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form> */}
        <h1>Cart Modal</h1>
        {/* <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
