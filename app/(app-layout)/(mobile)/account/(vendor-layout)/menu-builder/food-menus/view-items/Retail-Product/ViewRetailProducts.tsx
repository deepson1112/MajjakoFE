import { api } from "@/lib/fetcher";
import { Product } from "@/lib/validators/fooditems";
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface EditProductsProps {
  vendor_id: string;
}

const ViewRetailProducts = ({ vendor_id }: EditProductsProps) => {
  const { data: retailProducts, isLoading: retailProductsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          `/retails/retail-products/?category=&sub_category=&vendor=${vendor_id}`
        )
        .json<Product[]>();
      return response;
    },
    queryKey: ["retailer-products"],
  });

  return !!retailProducts?.length ? (
    <DataTable columns={columns} data={retailProducts} />
  ) : (
    <div>No Retail product availbe</div>
  );
};

export default ViewRetailProducts;
