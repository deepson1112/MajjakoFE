"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { UserEntity } from "@/types/models";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import Link from "next/link";
import PasswordInput from "./ui/PasswordInput";
import GoogleAuth from "@/app/(app-layout)/(auth)/GoogleAuth";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const unAuthSignSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UnAuthSignType = z.infer<typeof unAuthSignSchema>;

const UnAuthenticatedForm = ({
  toggleModalOpen,
}: {
  toggleModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const form = useForm<UnAuthSignType>({
    resolver: zodResolver(unAuthSignSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: handleLogOutFn, isLoading: handleLogOutFnLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api().post(undefined, "/user/logout").json();
        return response;
      },
      onSuccess: () => {
        router.push("/sign-up/user");
        router.refresh();
        setUser(null);
        queryClient.invalidateQueries("user-profile");
      },
      onError: (error: any) => {
        toast.error("Unable to log out", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const { mutate: handleLogin, isLoading: handleLoginLoader } = useMutation({
    mutationFn: async (credential: UnAuthSignType) => {
      const response = await api()
        .post(credential, "/user/token/")
        .json<UserEntity>();
      return response;
    },
    onSuccess: (data) => {
      setUser(data);

      if (data.profile_setup) {
        router.refresh();
        toggleModalOpen((prev) => !prev);
      } else {
        router.refresh();
        router.push("/profile-setup");
      }
    },
  });

  const handleNavigation = () => {
    handleLogOutFn();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        id="unauth-login-form"
        onSubmit={form.handleSubmit((data) => handleLogin(data))}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="text"
                    {...field}
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

        <div className="w-full space-y-4">
          <div className="w-full flex flex-col items-center space-y-2">
            <Button
              type="submit"
              className="w-full"
              isLoading={handleLoginLoader}
              disabled={handleLoginLoader}
              id="unauth-login-form"
            >
              Log In
            </Button>

            <Link href={"/forgot-password"} className="text-brand text-sm">
              Forgot Password?
            </Link>
          </div>

          <GoogleAuth />

          <div className="w-full">
            <p className="max-w-fit mx-auto text-center text-sm pt-2 flex items-center gap-1">
              Don&apos;t have an account?{" "}
              {user?.guest_user ? (
                handleLogOutFnLoader ? (
                  <span>
                    <Loader2 className="h-3 w-3 text-brand animate-spin" />
                  </span>
                ) : (
                  <span
                    onClick={() => handleNavigation()}
                    className="text-brand cursor-pointer"
                  >
                    Sign up
                  </span>
                )
              ) : (
                <Link
                  href={"/sign-up/user"}
                  className="text-brand cursor-pointer"
                >
                  Sign up
                </Link>
              )}
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UnAuthenticatedForm;
