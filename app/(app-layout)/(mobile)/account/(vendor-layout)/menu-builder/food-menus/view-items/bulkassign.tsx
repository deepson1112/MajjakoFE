"use client";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { api } from "@/lib/fetcher";
import { useMutation, useQuery } from "react-query";
import { FoodAddonType } from "../customization/columns";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/MultipleSelector";
import { queryClient } from "@/lib/queryClient";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";

const AddonBulkAssign = z.object({
  categories: z.array(z.string().min(1, "Addon is required!")),
});
type AddonbulkAssignType = z.infer<typeof AddonBulkAssign>;

interface RefinedItem {
  categories: string;
  food_addons_order: number;
  food_item: number;
}

export const BulkAssignAddons = (datas: any) => {
  const [open, setOpen] = useState(false);
  const form = useForm<AddonbulkAssignType>({
    resolver: zodResolver(AddonBulkAssign),
    defaultValues: {
      categories: [],
    },
  });

  const {
    data: foodAddonsData,
    isLoading: foodAddonsLoader,
    error: foodAddonsError,
  } = useQuery({
    queryFn: async () => {
      const response: FoodAddonType[] = await api()
        .get(`/menu/add-food-customization-title/`)
        .json();
      return response;
    },
    queryKey: ["food-addon-categories"],
    onError: (error) => {
      console.error(error);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: handleUpdateCategoryFn,
    isLoading: handleUpdateCategoryFnLoader,
    error: handleUpdateCategoryFnError,
  } = useMutation({
    mutationFn: async (payload: AddonbulkAssignType) => {
      let refined: RefinedItem[] = [];
      datas.datas.rows.forEach((x: any) => {
        payload.categories.forEach((y: any) => {
          refined.push({
            food_addons_order: 0,
            food_item: x.original.id,
            categories: y,
          });
        });
      });
      const { data } = await axiosInstance.post(
        "/menu/add-food-customization-title-to-items/",
        { items: refined }
      );
      return data;
    },
    onError: (err) => {
      toast.error("Cannot Update Food Item", {
        description: "Please Try Again",
      });
    },
    onSuccess: (data) => {
      toast.success("Sucessfully Updated Food Item");
      queryClient.invalidateQueries("food-items-list");
    },
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-xs bg-slate-900 hover:bg-slate-800 text-white">
            Bulk Assign
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[500px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {datas && !!datas.datas.rows.length ? (
            <>
              <DialogHeader>
                <DialogTitle>Bulk Assign Customization</DialogTitle>
                <DialogDescription>
                  You can assign the selected addon to all selected Food Items
                  at once.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) =>
                    handleUpdateCategoryFn(data)
                  )}
                >
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Addons Category</FormLabel>
                        <MultiSelector
                          options={foodAddonsData}
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select Addon Category..." />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {foodAddonsData &&
                                !!foodAddonsData.length &&
                                foodAddonsData.map((addon, index) => (
                                  <MultiSelectorItem
                                    key={index}
                                    value={addon.id.toString()}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <span>{addon.add_on_category}</span>
                                    </div>
                                  </MultiSelectorItem>
                                ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      isLoading={handleUpdateCategoryFnLoader}
                      disabled={
                        handleUpdateCategoryFnLoader || foodAddonsLoader
                      }
                      className="self-end my-2"
                    >
                      Assign
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          ) : (
            <DialogHeader>
              <DialogTitle>Error!!!</DialogTitle>
              <DialogDescription>
                Please Select At Least One Food!!
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BulkAssignAddons;
