"use client";
import { notFound, redirect, useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import ModifyCategories from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/modify-categories/ModifyCategories";

const ModifyCategoriesPage = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();
  if (isLoading) return <CategoryPageLoader />;
  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Modify Categories
      </h2>
      <ModifyCategories vendor_id={user.vendor_id} />
    </div>
  );
};

export default ModifyCategoriesPage;
