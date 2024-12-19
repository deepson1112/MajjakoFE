"use client";
import { google } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GoogleAuth from "../../GoogleAuth";

const UserPage = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-6 sm:mx-auto sm:w-full sm:max-w-md shadow p-6 rounded-xl">
        <Image
          src={"/final.svg"}
          alt="majjakodeals-logo"
          width={150}
          height={150}
        />

        <GoogleAuth />

        <Link
          href={"/sign-up/user/email"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex items-center gap-2 bg-white w-full"
          )}
        >
          <Mail />
          Continue with Email
        </Link>

        <p className="text-xs">
          Alreay have an accoount?{" "}
          <Link href={"/sign-in"} className="text-brand">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserPage;
