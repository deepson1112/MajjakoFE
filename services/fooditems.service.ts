// import { editProfileFormType } from "@/schemas/editProfileForm.schema";
import { ApiResponse } from "@/types/api";
import { UserEntity } from "@/types/models";
import { FoodApiRoutes } from "../configs/constants";
import { axiosInstance } from "@/lib/axiosInstance";
import { Category, DepartmentType, FoodItem } from "@/lib/validators/fooditems";

export const addFoodMenu = (data: FoodItem) => {
  return axiosInstance.post<ApiResponse<UserEntity>>(
    FoodApiRoutes.ADD_FOOD,
    data
  );
};

export const addCategory = (data: Category) => {
  return axiosInstance.post<ApiResponse<UserEntity>>(
    FoodApiRoutes.ADD_CATEGORY,
    data
  );
};

export const getAllCategory = () => {
  return axiosInstance.get<Category[]>(FoodApiRoutes.GET_ALL_CATEGORY);
};

export const getDepartmentCategory = () => {
  return axiosInstance.get<Category[]>(FoodApiRoutes.GET_ALL_CATEGORY);
};

export const getAllDepartment = () => {
  return axiosInstance.get<DepartmentType[]>(FoodApiRoutes.GET_ALL_DEPARTMENT);
};
