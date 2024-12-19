"use client";

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
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

export const requestProductSchema = z.object({
  product_name: z
    .string()
    .min(3, "Product name should at least be 3 letters long"),
  brand: z.string().min(2, "Brand name should at least be 3 letters long"),
  description: z.string(),
});

export type RequestProductType = z.infer<typeof requestProductSchema>;

const RequestProductForm = () => {
  const form = useForm<RequestProductType>({
    resolver: zodResolver(requestProductSchema),
    defaultValues: {
      brand: "",
      description: "",
      product_name: "",
    },
  });

  const {
    mutate: handleRequestProduct,
    isLoading: handleRequestProductLoader,
  } = useMutation({
    mutationFn: async (payload: RequestProductType) => {
      const response = await api()
        .post(payload, "/retails/product-request/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Successfully requested the product");
      form.reset({
        brand: "",
        description: "",
        product_name: "",
      });
    },
    onError: (error: any) => {
      toast.error("Unable to request the product", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleRequestProduct(data))}
        className="md:col-span-8 p-10"
      >
        <div className="grid grid-cols-2 gap-2 -mx-3 mb-6">
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Product Name..."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Brand Name..."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Product Description Name..."
                      className="bg-gray-100 resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button
          type="submit"
          isLoading={handleRequestProductLoader}
          disabled={handleRequestProductLoader}
        >
          Request
        </Button>
      </form>
    </Form>
  );
};

export default RequestProductForm;
