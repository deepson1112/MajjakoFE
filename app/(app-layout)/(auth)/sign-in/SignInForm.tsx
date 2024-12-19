"use client";

import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useUser from "@/lib/useUser";
import { useMutation } from "react-query";
import { UserEntity } from "@/types/models";
import { api } from "@/lib/fetcher";
import { Input } from "@/components/ui/Input";
import { ChevronDown } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import GoogleAuth from "../GoogleAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import PasswordInput from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";

const SignInFormSchema = z.object({
  email: z
    .string()
    .email("Invalid Email address")
    .min(1, "Email Address is required"),
  password: z.string().min(1, "Password is required"),
  remember_me: z.boolean(),
});

type SignInType = z.infer<typeof SignInFormSchema>;

export default function SignInForm() {
  const router = useRouter();
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const { mutate: loginUserFn, isLoading: loginUserFnLoader } = useMutation({
    mutationFn: async (credential: SignInType) => {
      const response = await api()
        .post(credential, "/user/token/")
        .json<UserEntity>();
      return response;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries("retail-cart-data");
      queryClient.invalidateQueries("retail-wishlists");
      setUser(data);

      if (data.profile_setup) {
        if (!!redirect?.length) {
          window.location.replace(redirect);
        } else {
          router.push("/");
        }
      } else {
        router.refresh();
        router.push("/profile-setup");
      }
    },
    onError: (error: any) => {
      toast.error(
        `${JSON.parse(error?.message)?.message || "Something went wrong."}`
      );
    },
  });

  // const loginUser = (data: SignInType) => {
  //   const loginPromise = new Promise((resolve, reject) => {
  //     loginUserFn(data, {
  //       onSuccess: resolve,
  //       // onError: reject,
  //       onError: (error: any) => {
  //         reject(
  //           JSON.parse(error?.message)?.message || "Something went wrong !!"
  //         );
  //       },
  //     });
  //   });

  //   toast.promise(loginPromise, {
  //     loading: "Loading...",
  //     success: (data) => `Sucessfully logged in`,
  //     // error: () => `Something went wrong`,
  //     error: (errorMessage) =>
  //       `${
  //         JSON.parse(errorMessage?.message)?.message || "Something went wrong."
  //       }`,
  //   });
  // };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          Good Food, Good Mood. Order now!
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => loginUserFn(data))}>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-4 md:py-8 shadow sm:rounded-lg sm:px-12 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <PasswordInput
                form={form}
                label="Password"
                name="password"
                placeHolder="Enter your password"
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember_me"
                  render={({ field }) => (
                    <FormItem className="lex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormLabel className="font-normal">Remember me</FormLabel>
                    </FormItem>
                  )}
                />

                <div className="text-sm leading-6">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-brand hover:text-brand_hover"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={loginUserFnLoader}
                disabled={loginUserFnLoader}
              >
                Sign in
              </Button>

              <h3 className="flex items-center w-full">
                <span className="flex-grow bg-gray-200 rounded h-[1.5px]"></span>
                <span className="mx-3 text-sm font-medium">or</span>
                <span className="flex-grow bg-gray-200 rounded h-[1.5px]"></span>
              </h3>

              <GoogleAuth />

              <div>
                <p className="text-sm flex gap-1">
                  Create Account?{" "}
                  <Popover>
                    <PopoverTrigger className=" text-brand flex items-center">
                      Sign Up <ChevronDown className="w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-fit p-1">
                      {/* <div className="flex divide-x-2 text-brand">
                      <Link href={"?"} className="pr-2">
                        User
                      </Link>
                      <Link href={"/"} className="pl-2">
                        Vendor
                      </Link>
                    </div> */}
                      <div>
                        <Link
                          href="/sign-up/user"
                          className={cn(
                            "block px-4 py-2 text-sm rounded-sm hover:bg-red-200 hover:text-red-800 hover:no-underline"
                          )}
                        >
                          As User
                        </Link>

                        <Link
                          href="/sign-up/vendor"
                          className={cn(
                            "block px-4 py-2 text-sm rounded-sm hover:bg-red-200 hover:text-red-800 hover:no-underline"
                          )}
                        >
                          As Vendor
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
