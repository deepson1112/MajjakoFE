import React, { Suspense } from "react";
import AuthCheck from "./AuthCheck";

interface layoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: layoutProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthCheck>{children}</AuthCheck>
    </Suspense>
  );
};

export default AuthLayout;
