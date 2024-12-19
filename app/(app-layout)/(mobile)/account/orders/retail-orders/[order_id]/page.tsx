import React from "react";
import { ChevronLeft } from "lucide-react";
import RetailOrderDetail from "./RetailOrder";
import RouterBack from "./RouterBack";

type ProductVariation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

type ProductDetails = {
  id: number;
  name: string;
};

type RetailProductVariationDetails = {
  id: number;
  product: ProductDetails;
  description: string;
  price: string;
  specifications: Record<string, string>;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  variation: ProductVariation[];
  variations_image: { default_image: string; image: string }[];
};

type OrderedProductDetails = {
  id: number;
  retail_product_variation_details: RetailProductVariationDetails;
  quantity: number;
  price: number;
  discount_amount: number;
  discounted_amount: number;
  tax_rate: number;
  tax_exclusive_amount: number;
  tax_amount: number;
  created_at: string;
  updated_at: string;
  order: number;
  vendor_order: number;
};

type RetailOrderVendor = {
  id: number;
  ordered_product_details: OrderedProductDetails[];
  total_amount: number;
  total_discount_amount: number;
  total_tax: number;
  vendor_coupon_discount: number;
  admin_coupon_discount: number;
  vendor: number;
  order: number;
  coupon_used: any;
};

type CartItem = {
  id: number;
  user: number;
  active: boolean;
  cart_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  receiver_name: string | null;
  shared_wishlist: string | null;
  special_request: string | null;
  retail_product_variation: RetailProductVariationDetails;
};

type VendorCart = {
  items: CartItem[];
  total: number;
  discount: number;
  subtotal: number;
  vendor_id: number;
  vendor_name: string;
  coupon_discount: number;
  admin_coupon_discount: number;
  vendor_coupon_details: any;
  vendor_coupon_discount: number;
};

type CartData = {
  total: number;
  vendors: VendorCart[];
  discount: number;
  subtotal: number;
  coupon_details: any;
  coupon_discount: number;
  loyalty_discount_amount: number;
};

interface FoodItem {
  food_title: string;
  price: number;
  order_food_addons?: {
    customization: {
      title: string;
      price: number;
    };
  }[];
}

interface Order {
  food_item: FoodItem;
  quantity: number;
}

interface OrderVendor {
  ordered_food: Order[];
}

interface Data {
  order_vendor: OrderVendor[];
}

export type RetailOrderConfirmation = {
  id: number;
  retail_order_vendor: RetailOrderVendor[];
  order_number: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  order_payment_code: string;
  total: number;
  tax_data: any;
  total_data: any;
  total_tax: number;
  delivery_charge: number;
  is_ordered: boolean;
  status: string;
  payment_method: string;
  loyalty_points_received: number;
  tip?: number;
  created_at: string;
  updated_at: string;
  user: number;
  payment: number;
  loyalty_program: any;

  vendors: number[];
  carts: number[];
  delivery_date?: string;
  cart_data: {
    total: number;
    subtotal: number;
    "loyalty-discount-amount": number | null;
    discount: number | null;
    "coupon-discount": number | null;
  };
  order_vendor: OrderVendor[];
};

export default function RetailOrderPage({
  params,
}: {
  params: { order_id: string };
}) {
  const { order_id } = params;

  return (
    <div>
      <RouterBack>
        <ChevronLeft />
        Back
      </RouterBack>
      <RetailOrderDetail order_id={order_id} />
    </div>
  );
}
