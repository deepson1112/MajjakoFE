import { VendorOrder } from "@/app/(app-layout)/payment/[clientSecret]/RetailPayment";

export interface VendorDetails {
  age_restriction: boolean;
  created_at: string;
  id: number;
  is_approved: boolean;
  tax_exempt: boolean;
  tax_rate: number;
  user: number;
  user_profile: number;
  vendor_cover_image: string | null;
  vendor_license: string;
  vendor_location: string | null;
  vendor_location_latitude: string | null;
  vendor_location_longitude: string | null;
  vendor_logo: string | null;
  vendor_name: string;
  vendor_slug: string;
}

export interface cartCustomization {
  id: number;
  name: string;
  price: number;
}

export interface cartAddonsType {
  cart: number;
  created_at: string;
  customization: cartCustomization;
  id: number;
  quantity: number;
  updated_at: string;
  customization_set: {
    title: string;
    price: number;
  };
}

export interface cartFooditem {
  id: number;
  name: string;
  vendor: string;
  food_title: string;
  price: string | number;
}

export interface userCart {
  cart_addons: cartAddonsType[];
  created_at: string;
  fooditem: cartFooditem;
  id: number;
  receiver_name: string;
  special_request: string;
  updated_at: string;
  user: number;
  quantity: number;
  per_item_amount: number;
  actual_amount: number;
  tax_amount: number;
  addons_cost: number;
  discount_amount: number;
  discounted_amount: number;
  discounted_price: number;
  discount_percentage: number | string;
  tip: number;
}

export interface CartCounterAndButtonsProps {
  addons: AddonsResponse[];
}

export interface AddonsResponse {
  add_on_category: string;
  created_by: number;
  customization_set: CustomizationSetResponse[];
  description: string;
  id: number;
  maximum_quantity: number;
  minimum_quantity: number;
  multiple_selection: boolean;
  select_type: string;
}

export interface CustomizationSetResponse {
  customization: null;
  customization_title: number;
  description: string;
  id: number;
  image: string;
  maximum_number: number;
  price: number;
  secondary_customization: boolean;
  title: string;
}

interface Customization {
  id: number;
  title: string | null;
  price: number;
  maximum_number: number;
  description: string | null;
  image: string | null;
  multiple_selection: boolean;
  secondary_customization: boolean;
  customization_title: number;
  created_by: number | null;
  customization: null;
}

interface FoodAddon {
  id: number;
  customization_set: Customization[];
  minimum_quantity: number;
  maximum_quantity: number;
  description: string | null;
  add_on_category: string;
  select_type: string;
  created_by: number;
}

interface FoodItem {
  id: number;
  food_addons: CartCounterAndButtons[];
  addons: AddonsResponse;
  food_title: string;
  description: string;
  price: string;
  image: string;
  discount?: SaveOnItemType;
  is_available: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  vendor_categories: number;
  vendor: number;
  hours_schedule: null;
}

interface FoodItemType {
  id: number;
  addons: FoodAddon[];
  food_title: string;
  description: string;
  price: string;
  image: string;
  is_available: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  vendor_categories: number;
  vendor: number;
  hours_schedule: null;
}

export interface VendorCategoryType {
  id: number;
  fooditem_set: FoodItem[];
  category_name: string;
  category_slug: string;
  category_description: string;
  tax_rate: number;
  tax_exempt: boolean;
  age_restriction: boolean;
  active: boolean;
  department: number;
  vendor: number;
  hours_schedule: null;
}

interface Discount {
  id: number;
  offer_type: string;
  offer_name: string;
  discount_percentages: number;
  minimum_spend_amount: number;
  maximum_redeem_value: number;
  start_date: string;
  end_date: string;
  audience: string;
  discount_banner: null;
  active: boolean;
  created_date: string;
  vendor: number;
  created_by: number;
  offer_items: OfferItem[];
}

interface OfferItem {
  id: number;
  food_title: string;
}

interface CustomizationSet {
  id: number;
  title: string;
  price: number;
}

export interface CartAddon {
  id: number;
  created_at: string;
  updated_at: string;
  quantity: number;
  cart: number;
  customization: number;
  customization_set: CustomizationSet;
}

interface FoodItem {
  id: number;
  fooditem: {
    id: number;
    food_title: string;
    discount: Discount;
    customer_type: string;
    price: string;
    image?: string;
    tax_percentage: number;
  };
  free_delivery: any[]; // assuming type 'any' because it's empty in the example
  cart_addons: CartAddon[];
  special_request: null;
  receiver_name: null;
  created_at: string;
  updated_at: string;
  active: boolean;
  quantity: number;
  user: number;
  per_item_addon_cost: number;
  tax_amount: number;
  discount_percentage: number;
  addons_cost: number;
  actual_amount: number;
  per_item_amount: number;
  discount_amount: number;
  discounted_amount: number;
}

interface Vendor {
  id: number;
  food_items: FoodItem[];
  coupons_offer: string;
  calculate_coupons: number;
  delivery_time: string;
  vendor_name: string;
  vendor_slug: string;
  tax_exempt: boolean;
  tax_rate: number;
  vendor_logo: string;
  vendor_cover_image: string;
  discount_amount: number;
  discounted_price: number;
  total_tax: number;
  addons_cost: number;
  sub_total: number;
  amount_after_coupon_discount: number;
  total_amount: number;
}

export interface SubTotalcalculationType {
  vendors: Vendor[];
  tip: number | string;
  discount_amount: number;
  discounted_price: number;
  total_tax: number;
  addons_cost: number;
  sub_total: number;
  total_amount: number;
}

export interface DeliveryAddressResponse {
  city: string;
  country: string;
  id: number;
  latitude: string;
  longitude: string;
  pin_code: string;
  state: string;
  user: number;
}

export interface OrderDetails {
  address: string;
  city: string;
  country: string;
  created_at: string;
  delivery_charge: number;
  delivery_date: string;
  email: string;
  first_name: string;
  id: number;
  is_ordered: boolean;
  last_name: string;
  order_number: string;
  order_vendor: any[];
  payment: null | string;
  payment_method: string;
  phone: string;
  pin_code: string;
  state: string;
  status: string;
  tax_data: null | object;
  tip: number;
  total: number;
  total_data: null | object;
  total_tax: number;
  updated_at: string;
  user: number;
  vendors: VendorOrder[];
}

export interface VendorTimelineType {
  ending_hours: string;
  hour_name: string;
  id: number;
  starting_hours: string;
  vendor: number;
  week_days: number[];
}

export interface LoyaltyType {
  id: number;
  valid: boolean;
  program_name: string;
  program_code: string;
  no_of_points: number;
  discount_percentages: number;
  maximum_redeem_amount: number;
  minimum_spend_amount: number;
}

export interface OfferList {
  description: string;
  id: string | number;
  name: string;
  vendor_name: string;
}

export interface CartQuantityType {
  fooditem: number;
  quantity: number;
  total_quantity: number;
}

type Specification = {
  Material: string;
  BrandName: string;
};

type Variation = {
  id: number;
  variation_name: string;
  variation_type: number;
  variation_type_name: string;
};

type VariationImage = {
  default_image: string;
  image: string;
  id?: number;
};

export type EditProduct = {
  created_date: string;
  description: string;
  id: number;
  price: string;
  product: number;
  sku: string;
  specifications: Specification;
  stock_quantity: number;
  updated_date: string;
  variation: Variation[];
  variations_image: VariationImage[];
};

export type Discount = {
  offer_type: string;
  audience: string;
  end_date: string;
  id: number;
  start_date: string;
  offer_items: {
    discount_percentages: number;
    id: number;
    retail_product: number;
    retail_product_variation: number | null;
    store_offer: number;
    sub_category: null | number;
  };
};

export type ProductVariation = {
  customer_type: string;
  created_date: string;
  description: string;
  discount: RetailDiscount;
  discount_amount: number;
  discounted_amount: number;
  id: number;
  price: string;
  product: number;
  sku: string;
  specifications: null | Array<{ field: string; value: string }>;
  stock_quantity: number;
  updated_date: string;
  variation: Array<{
    id: number;
    variation_name: string;
    variation_type: number;
    variation_type_name: string;
  }>;
  variations_image: Array<{
    default_image: string | null;
    image: string | null;
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    image_4: string | null;
  }>;
};

type VariationData = {
  available_variations: Array<{ id: number; name: string }>;
  id: number;
  name: string;
};

type PriceRange = {
  max_price: number;
  min_price: number;
};

export type Product = {
  age_restriction: boolean;
  category: number;
  created_date: string;
  default_image: string;
  description: string;
  discountable: boolean;
  id: number;
  image_1: null | string;
  image_2: null | string;
  image_3: null | string;
  image_4: null | string;
  name: string;
  price_range: PriceRange;
  product_unique_id: string;
  products_variations: ProductVariation[];
  sub_category: { sub_category_name: string; id: number };
  updated_date: string;
  variations_data: VariationData[];
  vendor: { id: number; vendor_name: string };
  refund_policies: Array<{ id: number; policy: string; description: string }>;
  special_request: boolean;
};

type VendorCouponDetails = {
  coupon_code: string;
  coupon_title: string;
  coupon_type: string;
  discount_amount: number;
  discount_percentages: number;
};

type RetailVendor = {
  vendor_id: number;
  vendor_name: string;
  items: Item[];
  subtotal: number;
  discount: number;
  vendor_delivery_charge: number;
  "coupon-discount": number;
  vendor_coupon_details: VendorCouponDetails;
  total: number;
  message: string;
};

type Item = {
  id: number;
  retail_product_variation: RetailProductVariation;
  cart_id: string;
  special_request: string | null;
  receiver_name: string | null;
  active: boolean;
  quantity: number;
  created_at: string;
  updated_at: string;
  user: number;
};

type RetailProductVariation = {
  id: number;
  product: RetailProduct[];
  product_detail: {
    description: string;
    id: number;
    sub_category: number;
  };
  variation: Variation[];
  price: string;
  description: string;
  specifications: Record<string, string>;
  stock_quantity: number;
  sku: string;
  tax_percentage: number;
  tax_amount: number;
  tax_exclusive_price: number;
  created_date: string;
  updated_date: string;
  variations_image: VariationImage[];
  customer_type: string;
  discount: Discount;
  discount_amount: number;
  discounted_amount: number;
};

type RetailProduct = {
  id: number;
  product_name: string;
  vendor_id: number;
};

type Variation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

type VariationImage = {
  id?: number;
  default_image?: string;
  image?: string;
  created_date?: string;
  variation?: number;
};

type RetailDiscount = {
  id: number;
  offer_type: string;
  offer_name: string;
  discount_percentages: number;
  minimum_spend_amount: number;
  maximum_redeem_value: number;
  start_date: string;
  end_date: string;
  audience: string;
  discount_banner: string;
  active: boolean;
  created_date: string;
  vendor: number;
  created_by: number;
};

export type RetailSubTotalCalculation = {
  COD: boolean;
  vendors: RetailVendor[];
  delivery_available: boolean;
  subtotal: number;
  discount: number;
  "loyalty-discount-amount": number;
  delivery_charge: number;
  coupon_details: {
    chowchow_coupon: Array<{
      coupon_code: string;
      coupon_title: string;
      coupon_type: string;
      discount_amount: number;
      discount_percentages: number;
      vendor_id: number;
      vendor_title: string;
    }>;
  };
  "coupon-discount": number;
  total: number;
};

export type RetailPaymentItemsType = {
  address: string;
  cart_data: RetailSubTotalCalculation;
  city: string;
  country: string;
  created_at: string;
  delivery_charge: number;
  delivery_date: string;
  email: string;
  first_name: string;
  id: number;
  is_ordered: boolean;
  last_name: string;
  loyalty_points_received: number;
  order_number: string;
  order_payment_code: string;
  payment: any;
  payment_method: string;
  phone: string;
  pin_code: string;
  state: string;
  status: string;
  tax_data: any;
  total: number;
  total_data: any;
  total_tax: number;
  updated_at: string;
  user: number;
  vendors: any[];
};

export type Variation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

export type VariationsImage = {
  default_image: string;
  image: string;
};

export type RetailProductVariation = {
  id: number;
  description: string;
  price: string;
  specifications: Record<string, string>;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  product: number;
  variation: Variation[];
  variations_image: VariationsImage[];
};

export type WishlistItem = {
  id: number;
  retail_product_variation_details: RetailProductVariation;
  product_name: string;
  wishlist_id: string;
  special_request: string | null;
  receiver_name: string | null;
  active: boolean;
  created_at: string;
  quantity: number;
  updated_at: string;
  user: number;
  buyer: null | {
    user_email: string;
    user_first_name: string;
    user_id: number;
    user_last_name: string;
  };
};

export type WishlistItems = {
  wishlist_details: WishlistItem[];
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
};

export interface AddressReturnValue {
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: string;
  latitude: string;
  longitude: string;
}

type ProductVariationDetail = {
  id: number;
  description: string;
  price: string;
  specifications: Record<string, string>;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  product: number;
  variation: Variation[];
  variations_image: Image[];
};

export type NestedProduct = {
  id: number;
  products_variations_detail: ProductVariationDetail[];
  name: string;
  description: string;
  discountable: boolean;
  age_restriction: boolean;
  product_unique_id: string;
  default_image: string;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  created_date: string;
  updated_date: string;
  tax_rate: number;
  tax_exempt: boolean;
  category: number;
  sub_category: number;
  vendor: number;
  is_complete: boolean;
};

export type CheckoutLocation = {
  address: string;
  city: string;
  country: string;
  email: string | undefined;
  first_name: string;
  id: number;
  is_mobile_verified?: boolean;
  last_name: string;
  latitude: string;
  longitude: string;
  mobile_otp?: string | null;
  phone_number: string;
  pin_code: string;
  state: string;
  user?: number;
};

export type UserType = {
  id: number;
  user_profile: {
    id: number;
    profile_picture: string | null;
    cover_photo: string | null;
    address: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    pin_code: string | null;
    latitude: number | null;
    longitude: number | null;
    applied_coupon: string | null;
    created_at: string;
    modified_at: string;
    loyalty_points: number;
    profile_setup: boolean;
    phone_number: string | null;
    is_mobile_verified: boolean;
    mobile_otp: string | null;
    nation: string | null;
    user: number;
  };
  user: {
    id: number;
    vendor_name: string;
    vendor_slug: string;
    vendor_license: string;
    vendor_description: string | null;
    vendor_phone: string;
    is_approved: boolean;
    created_at: string;
    modified_at: string;
    tax_rate: number;
    tax_exempt: boolean;
    age_restriction: boolean;
    vendor_cover_image: string;
    vendor_logo: string | null;
    vendor_location: string;
    vendor_location_latitude: string;
    vendor_location_longitude: string;
    profile_setup: boolean;
    vendor_type: number;
    user: number;
    user_profile: number;
    offerings: number[];
  };
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: number;
  date_joined: string;
  last_login: string;
  created_date: string;
  modified_date: string;
  is_admin: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  first_login: boolean;
  guest_user: boolean;
  groups: any[];
  user_permissions: any[];
};

export interface LocationPayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  location: string;
  address: string;
  nation: string;
  pin_code?: string | undefined;
  id?: number | undefined;
  email?: string | undefined;
}

export interface NotificationsType {
  created_at: string;
  id: number;
  image: string;
  link: string;
  message: string;
  title: string;
  updated_at: string;
}
