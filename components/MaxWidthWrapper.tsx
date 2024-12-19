import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ children, className }) => {
  return (
    <div
      className={cn("mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
