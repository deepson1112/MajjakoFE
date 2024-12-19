"use client";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import AddProduct from "../../add-products-new/AddProduct";
import useUser from "@/lib/useUser";

interface ViewProductNewProps {
  id: string;
}

type ProductVariation = {
  id: number;
  product: number;
  variation: {
    id: number;
    variation_type: number;
    variation_name: string;
    variation_type_name: string;
  }[];
  price: string;
  description: string | null;
  specifications: string | null;
  stock_quantity: number;
  sku: string;
  tax_percentage: number;
  tax_amount: number;
  tax_exclusive_price: number;
  created_date: string;
  updated_date: string;
  variations_image: {
    default_image: string | null;
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    image_4: string | null;
  }[];
  customer_type: string;
  discount: number | null;
};

type PriceRange = {
  max_price: number;
  min_price: number;
};

type Category = {
  id: number;
  category_name: string;
};

type SubCategory = {
  id: number;
  sub_category_name: string;
};

type Vendor = {
  id: number;
  vendor_name: string;
};

type RefundPolicy = {
  id: number;
  policy: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type VariationsData = {
  id: number;
  name: string;
  available_variations: {
    id: number;
    name: string;
  }[];
};

export type ProductDisplay = {
  id: number;
  products_variations: ProductVariation[];
  price_range: PriceRange;
  name: string;
  description: string;
  discountable: boolean;
  age_restriction: boolean;
  product_unique_id: string;
  default_image: string | null;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  created_date: string;
  updated_date: string;
  tax_rate: number;
  tax_exempt: boolean;
  disabled: boolean;
  is_complete: boolean;
  category: Category;
  sub_category: SubCategory;
  vendor: Vendor;
  refund_policies: RefundPolicy[];
  variations_data: VariationsData[];
  delivery_time: string;
};

const ViewProductNewEdit = ({ id }: ViewProductNewProps) => {
  const { data: product, isLoading: productLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/retail-products-display/${id}/`)
        .json<ProductDisplay>();
      return response;
    },
    queryKey: [`retail-nested-products-${id}`],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { user, isLoading } = useUser();

  return productLoader ? (
    <div>Loading...</div>
  ) : !!product ? (
    <div>
      <AddProduct
        vendor_id={user?.vendor_id!}
        is_edit
        defaultValues={product}
        is_retail
      />
    </div>
  ) : (
    <div>Invalid Product</div>
  );
};

export default ViewProductNewEdit;
