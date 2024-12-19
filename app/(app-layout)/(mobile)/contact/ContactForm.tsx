"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
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

export const contactSchema = z.object({
  first_name: z
    .string()
    .min(3, "Product name should at least be 3 letters long"),
  last_name: z
    .string()
    .min(3, "Product name should at least be 3 letters long"),
  email: z.string().email(),
  message: z.string().optional(),
  newsletter: z.boolean(),
});

type Contact = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      message: "",
      newsletter: true,
    },
  });

  const { mutate: handleSendMessage, isLoading: handleSendMessageLoader } =
    useMutation({
      mutationFn: async (payload: Contact) => {
        const response = await api().post(payload, "/contact/contact/").json();
        return response;
      },
      onSuccess: () => {
        toast.success("Successfuly sent message");
        form.reset({
          email: "",
          first_name: "",
          last_name: "",
          message: "",
          newsletter: true,
        });
      },
      onError: () => {
        toast.error("Something went wrong", {
          description: "Please try again",
        });
      },
    });

  return (
    <Form {...form}>
      <form
        className="md:col-span-8 p-10"
        onSubmit={form.handleSubmit((data) => handleSendMessage(data))}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter First Name..."
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
          <div className="w-full md:w-1/2 px-3">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Last Name..."
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
        </div>

        <div className="flex flex-wrap mb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email..."
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

        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-gray-100 resize-none border-none"
                        placeholder="Your message to us..."
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="md:flex md:items-center">
              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Send me your Newsletter!</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={handleSendMessageLoader}
              isLoading={handleSendMessageLoader}
              title="Contact Submission Button"
              type="submit"
              className="mt-2"
            >
              Send Message
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
