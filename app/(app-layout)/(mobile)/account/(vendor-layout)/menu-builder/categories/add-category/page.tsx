"use client";
import AddCategoryForm from "@/components/AddCategoryForm";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import useUser from "@/lib/useUser";
import { notFound, useRouter } from "next/navigation";
import React from "react";

const AddCategoryPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <CategoryPageLoader />;
  if (!user) return router.push("/sign-in");
  if (user?.role !== 1 || user?.vendor_type !== 1 || !user.vendor_id)
    return notFound();
  if (!user.vendor_id) return notFound();
  return (
    <>
      <AddCategoryForm vendor_id={user.vendor_id} />
    </>
  );
};

export default AddCategoryPage;
