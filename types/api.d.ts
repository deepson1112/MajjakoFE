import { MetaData, RestaurantEntity, UserEntity } from "./models";

export interface DefaultResponse {
  message: string;
}
export interface LoginResponse extends DefaultResponse {
  user: UserEntity;
}

export interface ApiResponse<T, S = unknown> {
  data: T;
  message?: string;
  meta?: S;
}

export interface RestaurantResponseMeta extends MetaData {
  topRestuarants: ApiResponse<RestaurantEntity[]>;
}
