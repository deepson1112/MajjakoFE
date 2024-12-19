"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import PasswordInput from "@/components/ui/PasswordInput";
import { api } from "@/lib/fetcher";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/lib/validators/user";
import { toast } from "sonner";

interface ChangePasswordPageProps {
  params: {
    uid: string;
    token: string;
  };
}

const ChangePasswordPage = ({ params }: ChangePasswordPageProps) => {
  const { token, uid } = params;
  const router = useRouter();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      retype_password: "",
    },
  });

  const {
    mutate: handleNewPasswordConfirmFn,
    isLoading: handleNewPasswordConfirmFnLoader,
  } = useMutation({
    mutationFn: async (payload: ChangePasswordType) => {
      const response = await api()
        .post(
          {
            old_password: payload.old_password,
            new_password: payload.new_password,
          },
          "/user/change-password/"
        )
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully Changed password");
      router.push("/sign-in");
    },
    onError: (error: any) => {
      toast.error("Something went wrong.", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

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
              onSubmit={form.handleSubmit((data) =>
                handleNewPasswordConfirmFn(data)
              )}
              className="space-y-6"
            >
              <PasswordInput
                form={form}
                label="Old Password"
                name="old_password"
                placeHolder="Enter your old password"
              />

              <PasswordInput
                form={form}
                label="Password"
                name="new_password"
                placeHolder="Enter your new password"
              />

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

export default ChangePasswordPage;
