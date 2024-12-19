import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { ExtraOptionType } from "@/lib/validators/fooditems";
import { useMutation } from "react-query";
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
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { api } from "@/lib/fetcher";
import { FoodAddonType } from "./columns";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { OptionDialog } from "@/components/OptionDialog";
import { foodAddonSchema, FoodAddonsType } from "./TabsContent";
import { queryClient } from "@/lib/queryClient";
import CustomizationOrder from "./dragOrder";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/Textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ViewModalProps {
  items: FoodAddonType;
}

interface newFoodInterface extends FoodAddonsType {
  customization_set: ExtraOptionType[];
}

export function EditCustomizationModal({ items }: ViewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [currentOptionState, setCurrentOptionState] = useState<
    ExtraOptionType[]
  >(items.customization_set || []);

  const form = useForm<z.infer<typeof foodAddonSchema>>({
    resolver: zodResolver(foodAddonSchema),
    defaultValues: {
      ...items,
    },
  });
  const { errors } = form.formState;

  const handleEditAddon = (data: z.infer<typeof foodAddonSchema>) => {
    const newCustomization = currentOptionState.map((option) =>
      (option?.customization as unknown as { id: number }) instanceof Object
        ? // @ts-ignore
          { ...option, customization: option?.customization?.id! }
        : option
    );
    console.log("Payload", newCustomization);
    console.log("Payload", {
      ...data,
      customization_set: newCustomization,
    });
    handleUpdaeAddonFn({ ...data, customization_set: newCustomization });
  };

  const { mutate: handleUpdaeAddonFn, isLoading: handleNewFoodAddonFnLoader } =
    useMutation({
      mutationFn: async (payload: newFoodInterface) => {
        const data = await api()
          .patch(payload, `/menu/add-food-customization-title/${items.id}/`)
          .json();
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully Updated the Customization!!");
        queryClient.invalidateQueries("food-addon-categories");
        router.refresh();
        setIsOpen(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to add new Addon", {
          description: "Please try again later",
        });
      },
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] p-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditAddon)}
            id="customization-form"
          >
            <ScrollArea className="h-[60vh]">
              <div className="flex">
                <div className="p-4 flex flex-col gap-3 border-r-2 border-gray-100 flex-1">
                  <FormField
                    control={form.control}
                    name="add_on_category"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Food Addon Title</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              className="bg-gray-100 border-none"
                              placeholder="Addon Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="maximum_quantity"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Maximum Order</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              className="bg-gray-100 border-none"
                              placeholder="Addon maximum order limit"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="minimum_quantity"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Minimum Requirement</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              className="bg-gray-100 border-none"
                              placeholder="Addon required number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="select_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={items.select_type}
                        >
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
                          Selection Type (Select Type determines if customer can
                          select the option single time or many)
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder={`Description...`}
                              className="bg-gray-100 border-none resize-none"
                            ></Textarea>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="p-4 w-72">
                  <OptionDialog
                    currentOptionState={currentOptionState}
                    setCurrentOptionState={setCurrentOptionState}
                    isEdit
                  />
                  <h6>Change Order Of Customization</h6>
                  <div className="mt-auto w-full max-h-80 overflow-y-auto">
                    <CustomizationOrder
                      items={items}
                      currentOptionState={currentOptionState}
                      setCurrentOptionState={setCurrentOptionState}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>

            <Button
              type="submit"
              className="bottpm-0 mb-4"
              isLoading={handleNewFoodAddonFnLoader}
              disabled={handleNewFoodAddonFnLoader}
              form="customization-form"
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
