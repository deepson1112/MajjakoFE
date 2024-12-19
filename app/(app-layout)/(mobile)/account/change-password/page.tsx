"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/fetcher";
import { MailSend } from "@/components/Icons";
import useUser from "@/lib/useUser";
import { toast } from "sonner";

type ChangePassword = {
  current_password: string;
  new_password: string;
  conform_new: string;
};

const ChangePasswordPage = () => {
  const { user } = useUser();

  const { register: registerForm, handleSubmit } = useForm<ChangePassword>();
  const {
    mutate: handleResetPassword,
    isLoading: handleResetPasswordFnLoader,
  } = useMutation<Response, AxiosError, ChangePassword>({
    // @ts-ignore
    mutationFn: async (passwords: ChangePassword) => {
      const response = await api()
        .post(passwords, "/auth/users/set_password/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Your Password has been changed!!");
    },
    onError: (error: any) => {
      toast.error(" Unable to change Your Password!!", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const { mutate: handleVerifyEmail, isLoading: handleVerifyEmailLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api()
          .post({ email: user?.email }, "/user/change-password-email/")
          .json();
        return response;
      },
      onSuccess: () => {
        toast.success("Sucessfully send the reset password mail");
      },
      onError: (error: any) => {
        toast.error("Something went wrong", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-[480px] text-center">
        <h2 className="mb-2 lg:mb-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Change YOUR PASSWORD
        </h2>
      </div> */}

      <div className="flex flex-col items-center space-y-8">
        {MailSend}
        <p className="text-base">
          Get password change link in you{" "}
          <span className="text-brand font-semibold">Email</span>.
        </p>
        <Button
          isLoading={handleVerifyEmailLoader}
          disabled={handleVerifyEmailLoader}
          onClick={() => handleVerifyEmail()}
        >
          Verify Email
        </Button>
      </div>

      {/* <div className="mt-10 lg:mt-0 sm:mx-auto sm:w-full md:max-w-[680px]">
        <div className="bg-white px-6 lg:py-12 shadow sm:rounded-lg sm:px-12">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(
              handleResetPassword as SubmitHandler<ChangePassword>
            )}
          >
            <div className="flex flex-col lg:flex-row gap-2 w-full">
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="new_password"
                    {...registerForm("new_password")}
                    type="password"
                    autoComplete=""
                    placeholder="New Password"
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Re-Enter New Password
                </label>
                <div className="mt-2">
                  <input
                    id="conform_new"
                    {...registerForm("conform_new")}
                    type="password"
                    autoComplete=""
                    placeholder="Re-Enter New Password"
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  id="current_password"
                  {...registerForm("current_password")}
                  type="password"
                  autoComplete=""
                  placeholder="Current Password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={handleResetPasswordFnLoader}
                disabled={handleResetPasswordFnLoader}
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default ChangePasswordPage;
