import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import { ApiRoutes } from "@/configs/constants";
import Cookies from "js-cookie";
import { BACKEND_BASE_URL } from "../configs/env";

// export const axiosInstance = axios.create({
//   // baseURL: BACKEND_BASE_URL + "/api",
//   baseURL: BACKEND_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const access: string | undefined = Cookies.get("accessToken");
//     if (access) {
//       config.headers = {
//         Authorization: `JWT ${access}`,
//       } as AxiosRequestHeaders;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async function (error) {
//     const originalRequest = error.config;
//     if (error?.response?.status === 401 && !originalRequest?._retry) {
//       originalRequest._retry = true;
//       const refresh: string | undefined = Cookies.get("refreshToken");
//       try {
//         const response = await axiosInstance.post(
//           ApiRoutes.REFRESH_ACCESS_TOKEN,
//           { refresh },
//           originalRequest
//         );
//         // console.log("Refresh Sucessed", response.data.access);
//         const access = response.data.access;
//         Cookies.remove("accessToken");
//         Cookies.set("accessToken", access);
//         return axiosInstance(originalRequest);
//       } catch (e) {
//         await axiosInstance.get(ApiRoutes.LOGOUT);
//         console.log("Refresh failed");
//         return Promise.reject(e);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // baseURL: "https://testing.majjakodeals.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post(
          ApiRoutes.REFRESH_ACCESS_TOKEN,
          undefined,
          originalRequest
        );
        return axiosInstance(originalRequest);
      } catch (e) {
        console.log("New Error");
        await axiosInstance.post(ApiRoutes.LOGOUT);
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
