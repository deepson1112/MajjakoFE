import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogFooter,
  DialogClose,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import useUser from "@/lib/useUser";
import {
  DeliveryAddressType,
  VerifyOtpSchema,
  VerifyOtpType,
} from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface VerifyNumberModal {
  setIsOtpRequired: Dispatch<SetStateAction<boolean>>;
  isOtpRequired: boolean;
  phone_number: string;
  resetForm: UseFormReturn<DeliveryAddressType>;
  setAccordionValue?: Dispatch<SetStateAction<string>>;
  setOtpRequiredLocation: Dispatch<SetStateAction<number | null>>;
  otpRequiredLocation: number | null;
  setRecentData?: Dispatch<SetStateAction<string | null>>;
  pendingRecentLocation: string | null;
}

export function VerifyNumberModal({
  isOtpRequired,
  setIsOtpRequired,
  phone_number,
  resetForm,
  setAccordionValue,
  otpRequiredLocation,
  setOtpRequiredLocation,
  setRecentData,
  pendingRecentLocation,
}: VerifyNumberModal) {
  const { user } = useUser();
  const [timer, setTimer] = useState<number | null>(null);

  const form = useForm<VerifyOtpType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: handleVerifyOtp, isLoading: handleVerifyOtpLoader } =
    useMutation({
      mutationFn: async (payload: VerifyOtpType) => {
        const response = await api()
          .post(
            {
              otp: Number(payload.otp),
              user_id: user?.id,
              phone_number,
              user_location: otpRequiredLocation,
            },
            "/user/location-otp-verify/"
          )
          .json();
        return response;
      },
      onSuccess: () => {
        resetForm.reset({
          city: "",
          country: "",
          state: "",
          address: "",
          first_name: "",
          last_name: "",
          location: "",
          phone_number: "",
          latitude: undefined,
          longitude: undefined,
          pin_code: undefined,
        });
        form.reset({
          otp: "",
        });
        queryClient.invalidateQueries("user-profile");
        queryClient.invalidateQueries("delivery-address");
        if (setAccordionValue) {
          setAccordionValue("saved-address");
        }
        if (setRecentData) {
          setRecentData(pendingRecentLocation);
        }
        setOtpRequiredLocation(null);
        setIsOtpRequired(false);
      },
      onError: (error: any) => {
        toast.error("Something went wrong", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const { mutate: handleResendOtp, isLoading: handleResendOtpLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api()
          .post(
            {
              // user_profile: user?.profile_id,

              user_location: otpRequiredLocation,
            },
            "/user/resend-otp/"
          )
          .json();
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("user-profile");
        toast.success("OTP code resent");
        setTimer(60);
      },
    });

  useEffect(() => {
    if (timer === null || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    // <AlertDialog open={isOtpRequired} onOpenChange={setIsOtpRequired}>
    //   <AlertDialogOverlay className="z-[550]" />
    //   <AlertDialogContent
    //     onOpenAutoFocus={(e) => e.preventDefault()}
    //     className="z-[551]"
    //   >
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Verfiy Phone Number</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         We are sending you a OTP to validate in{" "}
    //         <span className="text-brand">{phone_number}</span>.
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>

    //     <Form {...form}>
    //       <form
    //         id="new-address-verify"
    //         onSubmit={form.handleSubmit((data) => handleVerifyOtp(data))}
    //         className="flex items-center justify-center"
    //       >
    //         <div className="flex flex-col items-center space-y-6">
    //           <FormField
    //             control={form.control}
    //             name="otp"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-col items-center gap-3">
    //                 {/* <FormLabel className="text-center">
    //                   We are sending you a OTP to validate your mobile number.
    //                 </FormLabel> */}
    //                 <FormControl>
    //                   <InputOTP maxLength={6} {...field}>
    //                     <InputOTPGroup className="flex items-center gap-2">
    //                       <InputOTPSlot index={0} />
    //                       <InputOTPSlot index={1} />
    //                       <InputOTPSlot index={2} />
    //                       <InputOTPSlot index={3} />
    //                       <InputOTPSlot index={4} />
    //                       <InputOTPSlot index={5} />
    //                     </InputOTPGroup>
    //                   </InputOTP>
    //                 </FormControl>
    //                 <FormMessage />
    //                 <FormDescription>
    //                   Please enter the <span className="text-brand">OTP</span>{" "}
    //                   to verify your number to add new{" "}
    //                   <span className="text-brand">Address</span>.
    //                 </FormDescription>
    //               </FormItem>
    //             )}
    //           />
    //           <p className="text-sm">
    //             Didn&apos;t receive OTP?
    //             {timer !== null && timer > 0 ? (
    //               <span className="text-brand ml-2">
    //                 Resend OTP in {timer}s
    //               </span>
    //             ) : (
    //               <span
    //                 className="underline text-brand cursor-pointer ml-2"
    //                 onClick={() => handleResendOtp()}
    //               >
    //                 Resend OTP
    //               </span>
    //             )}
    //           </p>
    //         </div>
    //       </form>
    //       <AlertDialogFooter>
    //         <AlertDialogCancel>Cancel</AlertDialogCancel>
    //         <Button
    //           type="submit"
    //           form="new-address-verify"
    //           isLoading={handleVerifyOtpLoader || handleResendOtpLoader}
    //           disabled={handleVerifyOtpLoader || handleResendOtpLoader}
    //         >
    //           {handleResendOtpLoader ? "Resending OTP" : "Verify"}
    //         </Button>
    //       </AlertDialogFooter>
    //     </Form>
    //   </AlertDialogContent>
    // </AlertDialog>
    <Dialog open={isOtpRequired} onOpenChange={setIsOtpRequired}>
      <DialogOverlay className="bg-[rgb(0_0_0_/_0.1)] z-[550]" />
      <DialogContent
        className="sm:max-w-[450px] z-[551]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center space-y-3">
          <DialogTitle className="text-gray-600">
            Verfiy Phone Number
          </DialogTitle>
          <p className="text-sm">
            We are sending you a OTP to validate in{" "}
            <span className="text-brand">{phone_number}</span>.
          </p>
        </DialogHeader>
        <Form {...form}>
          <form
            id="new-address-verify"
            onSubmit={form.handleSubmit((data) => handleVerifyOtp(data))}
            className="flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    {/* <FormLabel className="text-center">
                      We are sending you a OTP to validate your mobile number.
                    </FormLabel> */}
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
                    <FormMessage />
                    <FormDescription className="text-center">
                      Please enter the <span className="text-brand">OTP</span>{" "}
                      to verify your number to add new{" "}
                      <span className="text-brand">Address</span>.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <p className="text-sm">
                Didn&apos;t receive OTP?
                {timer !== null && timer > 0 ? (
                  <span className="text-brand ml-2">
                    Resend OTP in {timer}s
                  </span>
                ) : (
                  <span
                    className="underline text-brand cursor-pointer ml-2"
                    onClick={() => handleResendOtp()}
                  >
                    Resend OTP
                  </span>
                )}
              </p>
            </div>
          </form>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              form="new-address-verify"
              isLoading={handleVerifyOtpLoader || handleResendOtpLoader}
              disabled={handleVerifyOtpLoader || handleResendOtpLoader}
            >
              {handleResendOtpLoader ? "Resending OTP" : "Verify"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
