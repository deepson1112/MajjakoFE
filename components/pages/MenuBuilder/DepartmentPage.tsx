"use client";

import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { useMutation, useQuery } from "react-query";
import useUser from "@/lib/useUser";
import EmptyDepartment from "@/components/others/EmptyDepartment";
import { DepartmentType, departmentSchema } from "@/lib/validators/fooditems";
import ListLoader from "@/components/loaders/ListLoader";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { toast } from "sonner";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";
import { useQueryParamState } from "@/hooks/useQueryParamState";

interface Props {
  id: number | string;
}

interface Department extends DepartmentType {
  vendor: number;
}

const DepartmentPage = ({ id }: Props) => {
  const { user } = useUser();
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
    useState(false);

  const form = useForm<DepartmentType>({
    resolver: zodResolver(departmentSchema),

    defaultValues: {
      age_restriction: false,
      tax_rate: undefined,
      tax_exempt: false,
      department_name: "",
    },
  });
  const watchTaxRate = form.watch("tax_exempt");

  const { mutate: handleNewDepartment, isLoading } = useMutation({
    mutationFn: async (payload: Department) => {
      const data = api().post(payload, "/menu/vendor-department/").json();
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully added category");
      queryClient.invalidateQueries("vendor-department");
      form.reset();
      setIsAddDepartmentModalOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to activate user", {
        description: "Please try again later",
      });
    },
  });

  const { data: departments, isLoading: departmentsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        // .get(`/menu/vendor-department/?vendor=${id}&page=${page}`)
        .get(`/retails/category/?vendor=${id}&page=${page}`)
        .json<{
          count: number;
          total_pages: number;
          results: DepartmentType[];
        }>();
      return response;
    },
    queryKey: [`vendor-department-${id}`, { page, id }],
    onError: (error) => {
      console.log(error);
      toast.error("Issue while fetching Departmets", {
        description: "Please Try Again",
      });
    },
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleAddDepartment = (data: DepartmentType) => {
    handleNewDepartment({ ...data, vendor: Number(user?.vendor_id!) });
  };

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-900">Sub-Categories</h2>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <h4 className="text-lg font-semibold text-gray-700">
          All Sub-Categories
        </h4>
        <Dialog
          open={isAddDepartmentModalOpen}
          onOpenChange={setIsAddDepartmentModalOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              Add New Sub-Category
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Sub-Category</DialogTitle>
              <DialogDescription>
                You can add sub-category for better management of the food
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
                          <Input
                            type="text"
                            {...field}
                            placeholder="Sub-Category name..."
                          />
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
                        Tax Rate (Does the Sub-Category includes tax?)
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
                            <SelectValue placeholder="Does the sub-category includes tax?" />
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
                              type="number"
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
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {departmentsLoader ? (
        <ListLoader />
      ) : !!departments && !!departments.results.length ? (
        <div>
          <DataTable columns={columns} data={departments.results} />
          <PaginationWithLinks
            page={Number(page) || 1}
            pageSize={10}
            totalCount={departments.count}
            setPage={setPage}
          />
        </div>
      ) : (
        <EmptyDepartment title="Sub-Category" />
      )}
    </>
  );
};

export default DepartmentPage;
