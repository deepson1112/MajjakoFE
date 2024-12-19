"use client";

import { Button } from "@/components/ui/Button";
import wretch from "wretch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Guest, guestSignUpSchema } from "@/lib/validators/user";
import { useMutation } from "react-query";
import useUser from "@/lib/useUser";
import { UserEntity } from "@/types/models";
import Link from "next/link";
import { toast } from "sonner";

export function GuestLogin({
  children,
  onSuccessFn,
}: {
  children: React.ReactNode;
  onSuccessFn?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { setUser } = useUser();

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
      toast.success("Sucessfully looged in as guest");
      // Cookies.set("accessToken", data?.access);
      // Cookies.set("refreshToken", data?.refresh);
      setUser(data);
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
    onError: (error: any) => {
      toast.error("Failed to looged in as guest", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleCreateGuestAccount = (data: Guest) => {
    handleCreateGuestAccountFn(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>You are not logged in</DialogTitle>
          <DialogDescription>
            You can log in as a guest or sign in if you have account.
          </DialogDescription>
        </DialogHeader>
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

            <span className="block text-sm text-gray-600">
              Already have an account?{" "}
              <Link href={"/sign-in"} className="text-brand font-semibold">
                Sign In
              </Link>
            </span>

            <DialogFooter>
              <Button
                type="submit"
                isLoading={handleCreateGuestAccountFnLoader}
                disabled={handleCreateGuestAccountFnLoader}
              >
                Continue as a guest
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
