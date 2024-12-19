"use client";

import { useState } from "react";
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
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

const EditProductVariationType = ({ id }: { id: number | string }) => {
  console.log("This is id", id);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ProductVariationType>({
    resolver: zodResolver(productVariationTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    data: productVariationTypes,
    isLoading: productVariationTypesLoader,
  } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/retail-variation-types/${id}`)
        .json<ProductVariationType>();
      return response;
    },
    onSuccess: (data) => {
      form.setValue("name", data.name || "");
      form.setValue("description", data.description || "");
    },
    queryKey: [`product-variation-type-${id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: handleUpdateProductVariationType,
    isLoading: handleUpdateProductVariationTypeLoader,
  } = useMutation({
    mutationFn: async (payload: ProductVariationType) => {
      const response = await api()
        .patch(payload, `/retails/retail-variation-types/${id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully updated variation type");
      queryClient.invalidateQueries("retail-variation-types");
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error("Cannot update variation type", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="w-full">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Variation Types</DialogTitle>
            <DialogDescription>
              You can edit variation for each products.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                handleUpdateProductVariationType(data)
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
                  isLoading={handleUpdateProductVariationTypeLoader}
                  disabled={handleUpdateProductVariationTypeLoader}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProductVariationType;
