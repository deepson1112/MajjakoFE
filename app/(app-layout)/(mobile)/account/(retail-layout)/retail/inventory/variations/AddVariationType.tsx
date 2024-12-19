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
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import {
  ProductVariationType,
  productVariationTypeSchema,
} from "@/lib/validators/fooditems";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/Textarea";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const AddVariationType = ({ isAdd }: { isAdd?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ProductVariationType>({
    resolver: zodResolver(productVariationTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    mutate: handleAddProductVariationType,
    isLoading: handleAddProductVariationTypeLoader,
  } = useMutation({
    mutationFn: async (payload: ProductVariationType) => {
      const response = await api()
        .post(payload, "/retails/retail-variation-types/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully added variation type");
      queryClient.invalidateQueries("retail-variation-types");
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error("Cannot add variation type", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {isAdd ? (
            <button className="cursor-pointer text-left relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent text-brand bg-brand/10 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <Plus className="w-3 h-3 mr-1" /> Add new variant type
            </button>
          ) : (
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              Add New Variation
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Variation Types</DialogTitle>
            <DialogDescription>
              You can add variation for each products.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-variant-type"
              onSubmit={form.handleSubmit((data) =>
                handleAddProductVariationType(data)
              )}
              className="py-4 flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Variation Name</FormLabel>
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
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Description of the variation"
                          className="resize-none bg-gray-100 border-none"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  form="add-variant-type"
                  isLoading={handleAddProductVariationTypeLoader}
                  disabled={handleAddProductVariationTypeLoader}
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVariationType;
