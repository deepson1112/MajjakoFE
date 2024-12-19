import wretch from "wretch";
import Cookies from "js-cookie";

export const apiBase = wretch(process.env.NEXT_PUBLIC_BASE_URL)
  .accept("application/json")
  .options({ credentials: "include" });

// const storeToken = (token: string, type: "access" | "refresh") => {
//   Cookies.set(type + "Token", token);
// };

const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("user");
};

const register = (email: string, username: string, password: string) => {
  return apiBase.post({ email, username, password }, "/auth/users/");
};

const login = (email: string, password: string) => {
  return apiBase.post({ email, password }, "/auth/jwt/create");
};

const logout = () => {
  return apiBase.post(undefined, "/user/logout");
};

const handleJWTRefresh = () => {
  return apiBase.post(undefined, "/user/refresh-token/");
};

const resetPassword = (email: string) => {
  return apiBase.post({ email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
) => {
  return apiBase.post(
    { uid, token, new_password, re_new_password },
    "/auth/users/reset_password_confirm/"
  );
};

export const AuthActions = () => {
  return {
    login,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,

    getToken,
    logout,
    removeTokens,
  };
};
