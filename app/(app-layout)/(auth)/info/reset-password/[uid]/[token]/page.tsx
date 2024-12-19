"use client";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/Form";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { newPasswordSchema, NewPasswordType } from "@/lib/validators/user";
import PasswordInput from "@/components/ui/PasswordInput";
import { toast } from "sonner";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

const ResetPasswordPage = ({ params }: Props) => {
  const { uid, token } = params;

  const router = useRouter();

  const form = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      retype_password: "",
    },
  });

  const {
    mutate: handleNewPasswordConfirmFn,
    isLoading: handleNewPasswordConfirmFnLoader,
  } = useMutation<Response, AxiosError, NewPasswordType>({
    mutationFn: async (payload) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/reset-password/`,
        {
          uid,
          token,
          new_password: payload.password,
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully Activated Account");
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Something went wrong", {
        description: `${error.message}`,
      });
    },
  });

  const handleNewPasswordConfirm = (data: NewPasswordType) => {
    handleNewPasswordConfirmFn(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px] text-center">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new password
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          Please enter a new password to reset the password
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleNewPasswordConfirm)}
              className="space-y-6"
            >
              <PasswordInput
                form={form}
                label="Password"
                name="password"
                placeHolder="Enter your password"
              />
              {/* <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}
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

              <PasswordInput
                form={form}
                label="Confirm Password"
                name="retype_password"
                placeHolder="Enter confirm password"
              />

              <div>
                <Button
                  isLoading={handleNewPasswordConfirmFnLoader}
                  disabled={handleNewPasswordConfirmFnLoader}
                  type="submit"
                  className="mt-4 w-full sm:w-fit sm:px-8"
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
