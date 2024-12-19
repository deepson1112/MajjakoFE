"use client";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";

const RouterBack = ({
  children,
  subtle,
}: {
  children: React.ReactNode;
  subtle?: boolean;
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant={subtle ? "subtle" : "outline"}
      className="my-2 rounded-full bg-white max-w-fit"
      size={"sm"}
    >
      {children}
    </Button>
  );
};

export default RouterBack;
