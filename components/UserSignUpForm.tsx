"use client";
import React from "react";
import { Button } from "./ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { UserSignUp, userSignUpSchema } from "@/lib/validators/user";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { TermsAndConditions } from "./TermsAndConditions";
import PasswordInput from "./ui/PasswordInput";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";

const UserSignUpForm = () => {
  const router = useRouter();

  const form = useForm<UserSignUp>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      retype_password: "",
      first_name: "",
      last_name: "",
      terms_conditions: true,
    },
  });

  const registerUser = (data: z.infer<typeof userSignUpSchema>) => {
    const payload = { ...data, role: 2 };
    registerUserFn(payload);
  };

  const { mutate: registerUserFn, isLoading: registerUserFnLoader } =
    useMutation<Response, AxiosError, UserSignUp>({
      mutationFn: async (payload) => {
        const { data } = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/`,
          payload
        );
        return data;
      },
      onSuccess: () => {
        router.push("/info/activation-message");
        toast.success("Sucessfully registered user", {
          description: "Please check email to verify you account",
        });
      },
      onError: (error) => {
        // console.log("This is serro from backend", error);
        toast.error("Something went wrong", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  console.log("This is loader", registerUserFnLoader);

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerUser)}
          className="mt-10 py-4 px-8 shadow sm:rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your last name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <PasswordInput
              form={form}
              label="Password"
              name="password"
              placeHolder="Enter your password"
            />

            <PasswordInput
              form={form}
              label="Confirm Password"
              name="retype_password"
              placeHolder="Enter confirm password"
            />
            {/* <FormField
              control={form.control}
              name="retype_password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
          </div>
          <div>
            <TermsAndConditions form={form} />
          </div>
          <div>
            <Button
              isLoading={registerUserFnLoader}
              disabled={registerUserFnLoader}
              type="submit"
              className="mt-4 w-full sm:w-fit sm:px-8"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default UserSignUpForm;
