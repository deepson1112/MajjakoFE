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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "./ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/Input";
import { Skeleton } from "./ui/Skeleton";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { AddonsComboBoxForm } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/food-menus/customization/AddonsComboBoxForm";
import { capitalizeWord } from "@/lib/utils";
import { Minus } from "lucide-react";
import { ExtraOptionType, extraOptionSchema } from "@/lib/validators/fooditems";
import { FoodAddonType } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/food-menus/customization/columns";
import { Switch } from "./ui/Switch";
import Price from "./Price";

interface OptionDialog {
  currentOptionState: ExtraOptionType[];
  setCurrentOptionState: Dispatch<SetStateAction<ExtraOptionType[]>>;
  isEdit?: boolean;
}

export const OptionDialog = ({
  currentOptionState,
  setCurrentOptionState,
  isEdit,
}: OptionDialog) => {
  const [open, setOpen] = useState(false);
  const form = useForm<ExtraOptionType>({
    resolver: zodResolver(extraOptionSchema),
    defaultValues: {
      title: "",
      price: undefined,
      description: undefined,
      secondary_customization: false,
      customization: undefined,
    },
  });

  const { data, isLoading: foodAddonsLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get(`/menu/food-addons-category/`).json();
      return response;
    },
    queryKey: ["food-addon-categories"],
    onError: (error) => {
      console.error(error);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleNewFoodAddon = (data: ExtraOptionType) => {
    setCurrentOptionState((prev) => [...prev, data]);
    form.reset({
      title: "",
      price: undefined,
      description: undefined,
      secondary_customization: false,
      customization: undefined,
      multiple_selection: false,
    });
    setOpen(false);
  };

  const isMultipleSelection = form.watch("multiple_selection");

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white">
            Add Extra Options
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[500px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Create Extra Option</DialogTitle>
            <DialogDescription>
              You can customize the addons with extra options.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(handleNewFoodAddon)}
              className="py-4 space-y-8"
              id="option-form"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="bg-gray-100 border-none"
                          placeholder="Option Title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="bg-gray-100 border-none"
                          placeholder="Option Price"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* <FormField
                      control={form.control}
                      name="select_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Type</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose amount the user can select the addon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SINGLE">Single</SelectItem>
                              <SelectItem value="MULTIPLE">Multiple</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                          <FormDescription>
                            Selection Type (Select Type determines if customer
                            can select the option single time or many)
                          </FormDescription>
                        </FormItem>
                      )}
                    /> */}

              {/*  */}
              {foodAddonsLoader ? (
                <Skeleton className="w-80 h-[40px]" />
              ) : (
                !!data && (
                  <AddonsComboBoxForm
                    data={data as FoodAddonType[]}
                    form={form}
                  />
                )
              )}

              <FormField
                control={form.control}
                name="multiple_selection"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Multiple Quantity</FormLabel>
                      <FormDescription>
                        Does this option allows for the multiple quantity.?
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

              {isMultipleSelection ? (
                <FormField
                  control={form.control}
                  name="maximum_number"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Selection Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="bg-gray-100 border-none"
                            placeholder="Maximum Quantity Amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              ) : null}

              <DialogFooter>
                <Button
                  type="button"
                  onClick={form.handleSubmit(handleNewFoodAddon)}
                  // isLoading={isLoading}
                  // disabled={isLoading}
                  form="option-form"
                >
                  Include Option
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {isEdit ? null : (
        <div className="space-y-2 py-3">
          {!!currentOptionState.length &&
            currentOptionState.map((option) => (
              <li
                className="flex items-center gap-3 py-3 px-4 w-full bg-gray-50 rounded-full"
                key={option.title}
              >
                <span className="flex items-center justify-between flex-1">
                  {capitalizeWord(option.title)}
                  <span className="text-xs">
                    <Price amount={option.price} />
                  </span>
                </span>

                <button>
                  <Minus
                    onClick={() =>
                      setCurrentOptionState((prev) =>
                        prev.filter((item) => item.title !== option.title)
                      )
                    }
                    className="w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full"
                  />
                </button>
              </li>
            ))}
        </div>
      )}
    </>
  );
};

export default OptionDialog;
