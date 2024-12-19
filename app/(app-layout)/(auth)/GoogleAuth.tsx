"use client";
import { google } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { useMutation } from "react-query";

const GoogleAuth = () => {
  //   const { mutate: handleGoogleAuth, isLoading: handleGoogleAuthLoader } =
  //     useMutation({
  //       mutationFn: async () => {
  //         const response = await api()
  //           .get("/accounts/google/login/?process=sign")
  //           .json();
  //         return response;
  //       },
  //     });
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/accounts/google/login/?process=login`}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "flex items-center gap-2 bg-white w-full"
      )}
      //   isLoading={handleGoogleAuthLoader}
      //   disabled={handleGoogleAuthLoader}
      //   onClick={() => handleGoogleAuth()}
    >
      {google}
      Continue with Google
    </Link>
  );
};

export default GoogleAuth;
