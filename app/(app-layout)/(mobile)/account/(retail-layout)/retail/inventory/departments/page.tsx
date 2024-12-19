"use client";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import DepartmentPage from "@/components/pages/MenuBuilder/DepartmentPage";
import useUser from "@/lib/useUser";
import { notFound, useRouter } from "next/navigation";

const RetailDepratmentPage = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();
  if (isLoading) return <CategoryPageLoader />;
  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return (
    <>
      <DepartmentPage id={user.vendor_id!} />
    </>
  );
};

export default RetailDepratmentPage;
