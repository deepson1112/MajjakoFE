"use client";
import { notFound, useRouter } from "next/navigation";
import AddItems from "./AddItems";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import useUser from "@/lib/useUser";

const FoodMenuPage = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();
  if (isLoading) return <CategoryPageLoader />;
  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return <AddItems vendor_id={user.vendor_id!} />;
};

export default FoodMenuPage;
