"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { Button } from "./ui/Button";
import { api } from "@/lib/fetcher";
import useUser from "@/lib/useUser";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

interface SignOutModalProps {
  isSignOutModalOpen?: boolean;
  setIsSignOutModalOpen?: Dispatch<SetStateAction<boolean>>;
  contents: string;
  children?: React.ReactNode;
}

export function SignOutModal({
  isSignOutModalOpen,
  setIsSignOutModalOpen,
  contents,
  children,
}: SignOutModalProps) {
  const router = useRouter();
  const { setUser } = useUser();
  const { mutate: handleLogOutFn, isLoading: handleLogOutFnLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api().post(undefined, "/user/logout").json();
        return response;
      },
      onSuccess: () => {
        if (setIsSignOutModalOpen) {
          setIsSignOutModalOpen(!isSignOutModalOpen);
        }
        router.push("/sign-in");
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

  return (
    <AlertDialog
      open={isSignOutModalOpen}
      onOpenChange={(data) => {
        if (setIsSignOutModalOpen) {
          setTimeout(() => (document.body.style.pointerEvents = ""), 100);
          setIsSignOutModalOpen(data);
        }
      }}
    >
      {children ? (
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      ) : null}

      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{contents}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => handleLogOutFn()}
            isLoading={handleLogOutFnLoader}
            disabled={handleLogOutFnLoader}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
