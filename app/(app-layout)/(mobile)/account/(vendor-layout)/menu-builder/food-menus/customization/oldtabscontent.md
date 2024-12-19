"use client";

import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
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
import { z } from "zod";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/Select";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { ExtraOptionType } from "@/lib/validators/fooditems";
import DepartmentListLoader from "@/components/loaders/DepartmentListLoader";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { Search } from "lucide-react";
import { DataTable } from "./data-table";
import { FoodAddonType, columns } from "./columns";
import { Textarea } from "@/components/ui/Textarea";
import OptionDialog from "@/components/OptionDialog";
import { HoursSchedule } from "@/components/HoursSchedule";

interface foodAddonType {
customization: null;
title: "daal";
price: 10.0;
maximum_number: 0;
description: "this is the description of this";
image: null;
multiple_orders: false;
secondary_customization: false;
food_addons: 7;
created_by: null;
}

export const foodAddonSchema = z
.object({
add_on_category: z.string().min(1, "Addon title is required!"),
select_type: z.string().min(1, "Select type is required!"),
minimum_quantity: z.coerce.number(),
maximum_quantity: z.coerce.number(),
multiple_selection: z.boolean().optional(),
description: z.string(),
})
.refine(
(data) => {
return data.select_type === "MULTIPLE" || data.select_type === "SINGLE"
? true
: false;
},
{
message: "Addon requires Select Type",
path: ["select_type"],
}
)
.refine(
(data) => {
return data.maximum_quantity <= 1 && data.select_type === "MULTIPLE"
? false
: true;
},
{
message:
"Cannot have multiple selection when maximum order is only One or less than One.",
path: ["select_type"],
}
)
.refine(
(data) => {
return data.minimum_quantity > 1 && data.select_type === "SINGLE"
? false
: true;
},
{
message:
"Cannot have single selection when minimum requirement is more than One.",
path: ["select_type"],
}
);

export type FoodAddonsType = z.infer<typeof foodAddonSchema>;

interface NewFoodPayload extends FoodAddonsType {
customization_set: ExtraOptionType[];
}

type overviewprops = {
is_retail?: boolean;
};

export const AddonOverViewTabContent = ({ is_retail }: overviewprops) => {
const { data, isLoading: foodAddonsLoader } = useQuery({
queryFn: async () => {
const response = await api()
.get(`/menu/add-food-customization-title/`)
.json<FoodAddonType[]>();
return response;
},
queryKey: ["food-addon-categories"],
onError: (error) => {
toast({
title: "Issue while fetching Departmets",
description: "Please Try Again",
variant: "destructive",
});
},
refetchOnWindowFocus: false,
});

return (
<div className="p-4">
<h2 className="text-3xl font-bold tracking-tight mb-4">
{is_retail ? "Product Variations" : "Food Addons"}
</h2>
<>
{foodAddonsLoader ? (
<DepartmentListLoader />
) : data && !!data.length! ? (
<DataTable columns={columns} data={data as FoodAddonType[]} />
) : (
<div>No {is_retail ? "Variations" : "Addons"} found</div>
)}
</>
</div>
);
};
type props = {
is_retail?: boolean;
};

export const AddCustomizationTabContent = ({ is_retail }: props) => {
const [currentOptionState, setCurrentOptionState] = useState<
ExtraOptionType[]

> ([]);

const form = useForm<z.infer<typeof foodAddonSchema>>({
resolver: zodResolver(foodAddonSchema),
defaultValues: {
add_on_category: "",
minimum_quantity: undefined,
maximum_quantity: undefined,
select_type: "",
},
});

const handleNewFoodAddon = (data: z.infer<typeof foodAddonSchema>) => {
if (currentOptionState.length) {
handleNewFoodAddonFn({ ...data, customization_set: currentOptionState });
}
};

const {
mutate: handleNewFoodAddonFn,
isLoading: handleNewFoodAddonFnLoader,
} = useMutation({
mutationFn: async (payload: NewFoodPayload) => {
const data = await api()
.post(payload, "/menu/add-food-customization-title/")
.json();
return data;
},
onSuccess: () => {
toast({
title: "Sucessfully Added",
variant: "default",
});
queryClient.invalidateQueries("food-addon-categories");
form.reset();
setCurrentOptionState([]);
},
onError: (error) => {
console.error(error);
toast({
title: "Failed to add new Addon",
description: "Please try again later",
variant: "destructive",
});
},
});

return (
<Form {...form}>
<form
        onSubmit={form.handleSubmit(handleNewFoodAddon)}
        id="customization-form"
      >
<div className="flex">
<div className="p-4 flex flex-col gap-3 border-r-2 border-gray-100 flex-1">
<FormField
control={form.control}
name="add_on_category"
render={({ field }) => {
return (
<FormItem>
<FormLabel>
{is_retail ? "Product Variations" : "Food Addon"} Title
</FormLabel>
<FormControl>
<Input
type="text"
{...field}
className="bg-gray-100 border-none"
placeholder={is_retail ? "Product Name" : "Addon Name"}
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
className="bg-gray-100 border-none resize-none" ></Textarea>
</FormControl>
<FormMessage />
</FormItem>
);
}}
/>
</div>
<div className="h-full p-4 w-72">
<OptionDialog
              currentOptionState={currentOptionState}
              setCurrentOptionState={setCurrentOptionState}
            />
</div>
</div>

        <Button
          type="submit"
          isLoading={handleNewFoodAddonFnLoader}
          disabled={handleNewFoodAddonFnLoader}
          form="customization-form"
        >
          Create
        </Button>
      </form>
    </Form>

);
};
