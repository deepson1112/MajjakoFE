import Image from "next/image";
import React from "react";
import { Label } from "../ui/Label";

interface EmptyDepartmentProps {
  title: string;
}

const EmptyDepartment = ({ title }: EmptyDepartmentProps) => {
  return (
    <div className="py-20">
      <div className="flex flex-col items-center">
        <Image
          src={"/empty-box.png"}
          alt="empty-box"
          width={512}
          height={512}
          className="h-20 w-20"
        />
        <h6 className="text-brand text-xl font-semibold">
          No {title} Created yet
        </h6>
        <Label>Create Your First {title}</Label>
      </div>
    </div>
  );
};

export default EmptyDepartment;
