export enum ApiRoutes {
  REGISTER_USER = "/auth/users/",
  USER_ACTIVATION = "/auth/users/activation/",
  RESET_PASSWORD = "/auth/users/reset_password/",
  RESET_PASSWORD_CONFIRM = "/auth/users/reset_password_confirm/",
  RESET_EMAIL = "/auth/users/reset_email/",
  RESET_EMAIL_CONFIRM = "/auth/users/reset_email_confirm/",
  USER_PROFILE = "/auth/users/me/",
  REFRESH_ACCESS_TOKEN = "/user/refresh-token/",
  LOGOUT = "/user/logout",
}

export enum FoodApiRoutes {
  ADD_FOOD = "/menu/food/",
  ADD_CATEGORY = "/menu/food-category/",
  GET_ALL_CATEGORY = "/menu/vendor-category/",
  GET_DEPARTMENT_CATEGORY = "vendor-category/?department=11&vendor=",
  GET_ALL_DEPARTMENT = "/menu/vendor-department/",
}

export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
