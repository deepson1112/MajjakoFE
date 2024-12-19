// import { editProfileFormType } from "@/schemas/editProfileForm.schema";
import { ApiResponse } from "@/types/api";
import { UserEntity } from "@/types/models";
import { ApiRoutes } from "../configs/constants";
import { axiosInstance } from "@/lib/axiosInstance";
import { UserSignUp } from "@/lib/validators/user";
import { api } from "@/lib/fetcher";

export const getUserProfileService = () => {
  return api().url(ApiRoutes.USER_PROFILE).get().json<UserEntity | null>();
};
// export const getUserProfileService = () => {
//   return axiosInstance.get<UserEntity | null>(ApiRoutes.USER_PROFILE);
// };

export const logoutService = () => {
  return axiosInstance.get<ApiResponse<UserEntity>>(ApiRoutes.LOGOUT);
};

export const userSignUp = (data: UserSignUp) => {
  return axiosInstance.post(ApiRoutes.REGISTER_USER, data);
};

// export const editUserProfileService = (data: editProfileFormType) => {
//   return axiosInstance.put<ApiResponse<UserEntity>>(
//     ApiRoutes.USER_PROFILE,
//     data
//   );
// };
