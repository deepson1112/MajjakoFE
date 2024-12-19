import React from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function ItemsWrapper({ children }: ChildrenProps) {
  return (
    <div className="w-full px-2 md:px-16 flex justify-center items-center ">
      <section className="min-w-full flex flex-row gap-x-2 2xl:gap-x-8 pt-2 pb-4 overflow-x-auto lg:w-fit lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:justify-items-center lg:justify-center lg:gap-y-4">
        {children}
      </section>
    </div>
  );
}
