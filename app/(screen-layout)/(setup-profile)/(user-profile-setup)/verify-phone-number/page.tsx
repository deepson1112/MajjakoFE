"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import useUser from "@/lib/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/queryClient";
import { VerifyOtpSchema, VerifyOtpType } from "@/lib/validators/user";
import { toast } from "sonner";

function VerifyOtpPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [timer, setTimer] = useState<number | null>(null);

  const form = useForm<VerifyOtpType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: handleResendOtp, isLoading: handleResendOtpLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api()
          .post({ user_profile: user?.profile_id }, "/user/resend-otp/")
          .json();
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        toast.success("OTP code resent");
        setTimer(60);
      },
    });

  const { mutate: handleVerifyOtp, isLoading: handleVerifyOtpLoader } =
    useMutation({
      mutationFn: async (payload: VerifyOtpType) => {
        const response = await api()
          .post(
            { otp: Number(payload.otp), user_id: user?.id },
            "/user/profile-otp-verify/"
          )
          .json();
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        router.push("/");
      },
    });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (timer === null || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleVerifyOtp(data))}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-6">
          <Image
            src={"/final.svg"}
            alt="majjakodeals-logo"
            width={150}
            height={150}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-3">
                <FormLabel className="text-center">
                  We are sending you a OTP to validate your mobile number.
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex items-center gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the <span className="text-brand">OTP</span> to
                  verify your number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-sm">
            Didn&apos;t receive OTP?
            {timer !== null && timer > 0 ? (
              <span className="text-brand ml-2">Resend OTP in {timer}s</span>
            ) : (
              <span
                className="underline text-brand cursor-pointer ml-2"
                onClick={() => handleResendOtp()}
              >
                Resend OTP
              </span>
            )}
          </p>

          <Button
            type="submit"
            className="w-full"
            isLoading={handleVerifyOtpLoader || handleResendOtpLoader}
            disabled={handleVerifyOtpLoader || handleResendOtpLoader}
          >
            {handleResendOtpLoader ? "Resending OTP" : "Verify"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default VerifyOtpPage;
