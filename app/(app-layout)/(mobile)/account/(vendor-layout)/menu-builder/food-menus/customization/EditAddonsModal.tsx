import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { extraOptionSchema, ExtraOptionType } from "@/lib/validators/fooditems";
import { useMutation, useQuery } from "react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { api } from "@/lib/fetcher";
import { cusumizationType, FoodAddonType } from "./columns";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Skeleton } from "@/components/ui/Skeleton";
import { AddonsComboBoxForm } from "./AddonsComboBoxForm";

interface ViewModalProps {
  items: FoodAddonType;
}

interface EditAddonsModalProps extends cusumizationType {
  currentOptionState: ExtraOptionType[];
  setCurrentOptionState: Dispatch<SetStateAction<ExtraOptionType[]>>;
}

export function EditAddonsModal({
  customization,
  customization_order,
  customization_title,
  description,
  image,
  maximum_number,
  multiple_selection,
  secondary_customization,
  id,
  price,
  title,
  setCurrentOptionState,
  currentOptionState,
}: EditAddonsModalProps) {
  console.log("Customization", customization);
  const [open, setOpen] = useState(false);
  const form = useForm<ExtraOptionType>({
    resolver: zodResolver(extraOptionSchema),
    defaultValues: {
      title,
      price: Number(price),
      description: description || null,
      secondary_customization,
      customization:
        customization && customization.id ? Number(customization.id!) : null,
      multiple_selection,
      maximum_number,
    },
  });

  const { data, isLoading: foodAddonsLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get(`/menu/food-addons-category/`).json();
      return response;
    },
    onError: (error) => {
      console.error(error);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleNewFoodAddon = (data: ExtraOptionType) => {
    console.log("Data of addons", { id, ...data });
    const newSelectedOptionState = currentOptionState.map((item) =>
      item.id === id
        ? {
            ...item,
            id,
            price: data.price,
            title: data.title,
            customization: data.customization,
            // description: data.description,
            maximum_number: data.maximum_number,
            multiple_selection: data.multiple_selection,
            secondary_customization: data.secondary_customization,
          }
        : item
    );
    setCurrentOptionState(newSelectedOptionState);

    setOpen(false);
  };

  const isMultipleSelection = form.watch("multiple_selection");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Extra Option</DialogTitle>
          <DialogDescription>
            You can edit the addons with extra options.
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
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
