"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// import type { Metadata } from "next";

interface ForgotPassword {
  email: string;
}

const ForgotPasswordPage = () => {
  const { register: registerForm, handleSubmit } = useForm<ForgotPassword>();
  const router = useRouter();

  // const handleResetPassword = ({ email }: ForgotPassword) => {
  //   console.log(email);
  // };

  const {
    mutate: handleResetPassword,
    isLoading: handleResetPasswordFnLoader,
  } = useMutation<Response, AxiosError, ForgotPassword>({
    mutationFn: async (email: ForgotPassword) => {
      console.log(email);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/reset-password-email/`,
        {
          email: email.email,
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully Resend Account");
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to resend user", {
        description: "Please try again later",
      });
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px] text-center">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          FORGOT YOUR PASSWORD?
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          Please enter your email to receive a password reset link.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(
              handleResetPassword as SubmitHandler<ForgotPassword>
            )}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  {...registerForm("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
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
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
