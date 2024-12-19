"use client";
import { notFound, useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import CategoryPageLoader from "@/components/loaders/CategoryPageLoader";
import { ViewProducts } from "./ViewProducts";
import { Suspense, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FileUp } from "lucide-react";
import ExportCSV from "./ExportCSV";

const ViewItemsPage = () => {
  const router = useRouter();
  const divRef = useRef(null);
  const { user, isLoading } = useUser();
  if (isLoading) return <CategoryPageLoader />;

  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight mb-4" ref={divRef}>
          View Items
        </h2>

        <ExportCSV />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ViewProducts />
      </Suspense>
    </div>
  );
};

export default ViewItemsPage;
