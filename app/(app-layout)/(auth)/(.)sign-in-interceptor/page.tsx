"use client";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import wretch from "wretch";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useMutation } from "react-query";
import { Guest, guestSignUpSchema } from "@/lib/validators/user";
import useUser from "@/lib/useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserEntity } from "@/types/models";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInInterceptor = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const form = useForm<Guest>({
    resolver: zodResolver(guestSignUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: handleCreateGuestAccountFn,
    isLoading: handleCreateGuestAccountFnLoader,
  } = useMutation({
    mutationFn: async (payload: Guest) => {
      payload;
      const response = await wretch(process.env.NEXT_PUBLIC_BASE_URL)
        .options({
          credentials: "include",
        })
        .post(payload, "/user/guest-user/")
        .json<UserEntity>();

      return response;
    },
    onSuccess: (data) => {
      toast.success("sucessfully logged in as guest");
      router.back();
      setUser(data);
    },
    onError: (error: any) => {
      toast.error("Failed to log in as guest", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleCreateGuestAccount = (data: Guest) => {
    handleCreateGuestAccountFn(data);
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <dialog className="absolute left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold text-lg">You are not logged in</h6>
            <p className="text-xs">
              To add the food items into your card, you must log in first.
            </p>
          </div>

          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => router.back()}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateGuestAccount)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Guest Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="bg-gray-100 border-none"
                        placeholder="Enter a email to continue as a guest"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <span className="p-1 my-2 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  console.log("Hello");
                  router.forward();
                }}
                className="text-brand font-semibold"
              >
                Sign In
              </span>
            </span>

            <div>
              <Button
                type="submit"
                isLoading={handleCreateGuestAccountFnLoader}
                disabled={handleCreateGuestAccountFnLoader}
              >
                Continue as a guest
              </Button>
            </div>
          </form>
        </Form>
      </dialog>
    </div>
  );
};

export default SignInInterceptor;
