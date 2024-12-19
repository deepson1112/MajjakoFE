"use client";
import useUser from "@/lib/useUser";
import { notFound, useRouter } from "next/navigation";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import AddItems from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/food-menus/add-items/AddItems";

const FoodMenuPage = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();
  if (isLoading) return <CategoryPageLoader />;
  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return <AddItems is_retail vendor_id={user.vendor_id!} />;
};

export default FoodMenuPage;
