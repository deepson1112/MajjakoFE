export type availableVariations = {
  id: String | Number;
  name: String;
};
export type variationsType = {
  id: String | Number;
  name: String;
  available_variations: [availableVariations];
};
export interface RetailItems {
  created_at: string;
  description: string;
  food_item_order: number;
  name: string;
  hours_schedule: string | null;
  id: number;
  default_image: string;
  age_restriction: boolean;
  price_range: {
    min_price: string;
    max_price: string;
  };
  updated_at: string;
  vendor: number;
  created_date: String;
  category: number;
  sub_category: number;
  variations_data: [variationsType];
}

export interface Specification {
  Brand: string;
  Style: string;
  Variants: string;
}

export interface VariationType {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
}

export interface VariationImage {
  default_image?: string;
  image: string;
  id?: number;
  created_date?: string;
  variation?: number;
}

export interface ProductVariation {
  id: number;
  description: string;
  price: string;
  specifications: Specification;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  product: number;
  variation: VariationType[];
  variations_image: VariationImage[];
}

export interface PriceRange {
  max_price: number | null;
  min_price: number | null;
}

export interface VariationData {
  id: number;
  name: string;
  available_variations: {
    id: number;
    name: string;
  }[];
}

export interface RetailProduct {
  id: number;
  products_variations: ProductVariation[];
  price_range: PriceRange;
  name: string;
  description: string;
  discountable: boolean;
  age_restriction: boolean;
  product_unique_id: string;
  default_image: string;
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  image_4?: string | null;
  created_date: string;
  updated_date: string;
  category: number;
  sub_category: number;
  vendor: number;
  variations_data: VariationData[];
}

export interface VendorCategory {
  id: number;
  retail_products: RetailProduct[];
  category_name?: string;
  department: number;
  vendor: number;
  tax_rate: number;
  image: string | null;
}

export interface VendorCategoriesSet {
  id: number;
  department_name: string;
  vendor: number;
  tax_rate: number;
  vendorcategories_set: VendorCategory[];
  image: string | null;
}
