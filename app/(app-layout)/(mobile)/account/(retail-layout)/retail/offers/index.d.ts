export interface BuyOneGetOneRetail {
  active: boolean;
  audience: string;
  created_by: number;
  created_date: string;
  discount_banner: string | null;
  end_date: string;
  id: number;
  offer_name: string;
  retail_products: Array<{ product_name: string; product_id: number }>;
  start_date: string;
  vendor: number;
}
