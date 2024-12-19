export interface UserEntity {
  id: number;
  first_login: boolean;
  role: number;
  email: string;
  is_retail?: boolean;
  is_restaurant?: boolean;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  vendor_id?: string | null;
  user_profile: { id: number };
  profile_picture?: string | null;
  cover_photo?: string | null;
  address?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pin_code?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  access?: string;
  refresh?: string;
  profile_id?: string;
  restaurant_name?: string;
  profile_setup: boolean;
  vendor_type: number;
  is_active: boolean;
  guest_user: boolean;
}

export interface UserEntityMe {
  id: number;
  first_login: boolean;
  role: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  vendor_id?: string | null;
  user_profile: { id: number };
  profile_picture?: string | null;
  cover_photo?: string | null;
  address?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pin_code?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  profile_id?: string | null;
  is_retail?: boolean;
  is_restaurant?: boolean;
  access?: string;
  refresh?: string;
}

export interface UserProfile {
  address: string | null;
  applied_coupon: string | null;
  city: string | null;
  country: string | null;
  cover_photo: string | null;
  created_at: string | null;
  id: number;
  loyalty_points: number | null;
  latitude: number | null;
  location: string | null;
  longitude: number | null;
  pin_code: number | null;
  profile_picture: string | null;
  state: string | null;
  user: number;
  vendor_type: number | string;
}
