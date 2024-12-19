"use client";
import React from "react";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer flex flex-col items-center"
      onClick={() => {
        localStorage.removeItem("user");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        router.push("/sign-in");
      }}
    >
      <LogOut />
      <span className="block text-xs">Sign Out</span>
    </div>
  );
};

export default SignOutBtn;
