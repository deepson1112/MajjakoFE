"use client";
import { notFound, useRouter } from "next/navigation";

import useUser from "@/lib/useUser";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import ViewRetailProducts from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/food-menus/view-items/Retail-Product/ViewRetailProducts";

const ViewItemsPage = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();
  if (isLoading) return <CategoryPageLoader />;

  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold tracking-tight mb-4">View Items</h2>
      {/* <ViewItems is_retail vendor_id={user.vendor_id} /> */}
      <ViewRetailProducts vendor_id={user.vendor_id} />
    </div>
  );
};

export default ViewItemsPage;
