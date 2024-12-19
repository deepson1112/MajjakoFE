import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { FoodAddonType } from "../customization/columns";
import { capitalizeWord } from "@/lib/utils";
import AddonsLists from "./AddonsLists";

const FormSchema = z.object({
  items: z
    .array(z.number())
    .refine((value) => value.length || typeof value === "string", {
      message: "You have to select at least one addon to include.",
    }),
});

interface AddonsFormProps {
  is_retail?: boolean;
  currentAddons: number[];
  setCurrentAddons: Dispatch<SetStateAction<number[]>>;
}

const AddonsForm = ({
  is_retail,
  currentAddons,
  setCurrentAddons,
}: AddonsFormProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: currentAddons.length ? currentAddons : [],
    },
  });

  const removeCheckedValue = (id: number) => {
    const currentValues = form.watch("items");

    const index = currentValues.indexOf(id);
    currentValues.splice(index, 1);
    form.setValue("items", currentValues);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { items } = data;
    setCurrentAddons(items);
    setOpen(false);
  }

  const { data: foodAddonsData, isLoading: foodAddonsLoader } = useQuery({
    queryFn: async () => {
      const response: FoodAddonType[] = await api()
        .get(`/menu/add-food-customization-title/`)
        .json();
      return response;
    },
    queryKey: ["food-addon-categories"],
    onError: (error) => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="sticky top-0 py-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="w-5 h-5" />{" "}
            {is_retail ? "Add New Variations" : "Add New Addons"}
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {is_retail ? "Add Product-Variations" : "Add Food-Addons"}
            </DialogTitle>
            <DialogDescription>
              {is_retail
                ? "You can add multiple Product variations to your Product items."
                : "You can add multiple food addons to your food items."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              id="addons-form"
            >
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem className="max-h-72 overflow-y-auto">
                    {!!foodAddonsData?.length &&
                      foodAddonsData.map((addon) => (
                        <FormField
                          key={addon.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={addon.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(addon.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            addon.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== addon.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {/* {capitalizeWord(addon.add_on_category)} */}
                                  {capitalizeWord(addon.add_on_category)}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            <DialogFooter>
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                form="addons-form"
                className="bg-gray-900 hover:bg-gray-800"
              >
                Include
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>

      <section>
        {!!currentAddons.length && !!foodAddonsData?.length ? (
          <ul className="py-3 space-y-2">
            {foodAddonsData.map((addonData) => {
              return currentAddons.includes(addonData.id) ? (
                <AddonsLists
                  key={addonData.id}
                  department_name={addonData.add_on_category}
                  id={addonData.id}
                  setCurrentAddons={setCurrentAddons}
                  removeCheckedValue={removeCheckedValue}
                />
              ) : null;
            })}
          </ul>
        ) : (
          <h5>{is_retail ? "No variations selected" : "No addons selected"}</h5>
        )}
      </section>
    </div>
  );
};

export default AddonsForm;
