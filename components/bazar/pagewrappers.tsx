import React from "react";

export default function PageWrappers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[1440px] scroll-smooth min-h-screen mx-auto w-full h-full mt-16 lg:mt-40">
      {children}
    </main>
  );
}
