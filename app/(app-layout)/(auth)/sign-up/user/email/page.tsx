import UserSignUpForm from "@/components/UserSignUpForm";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Sign up to your account as a{" "}
            <span className="text-brand">User</span>
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            Please fill this form to get yourself onboarded in the Majjakodeals
            marketplace.
          </p>
        </div>
        <UserSignUpForm />
      </div>
    </div>
  );
};

export default page;
