"use server";

import wretch, { Wretch, WretchError } from "wretch";
import cookies from "js-cookie";
import { redirect } from "next/navigation";
import { AuthActions } from "./authUtils";
// import { cookies, headers } from "next/headers";

// Extract necessary functions from the AuthActions utility.
const { handleJWTRefresh, storeToken, getToken } = AuthActions();

/\*\*

- Configures the API with authentication and automatic token refresh on 401 responses.
  \*/

export const api = () => {
return (

.options({ credentials: "include", mode: "cors" })
// Initialize authentication with the access token.
.auth(`JWT ${getToken("access")}`)
// Catch 401 errors to refresh the token and retry the request.
.catcher(401, async (error: WretchError, request: Wretch) => {
try {
// const refresh = cookies().get("refresh")?.value
// Attempt to refresh the JWT token.
const { access } = (await handleJWTRefresh().json()) as {
access: string;
};

          console.log("Meow meow", access);

          // Store the new access token.
          storeToken(access, "access");

          // Replay the original request with the new access token.
          return request
            .auth(`JWT ${access}`)
            .fetch()
            .unauthorized(() => {
              // Rethrow the error if unauthorized after token refresh.
              console.log("Unauthorized");
              // redirect("/");
            })
            .json();
        } catch (err) {
          console.log("Here we go", getToken("accessToken"));
          cookies.remove("user");
          cookies.remove("refreshToken");
          cookies.remove("accessToken");
          console.log("Error", err);
          // redirect("/");
        }
      })

);
};

/\*\*

- Fetches data from the specified URL, automatically handling authentication and token refresh.
- @returns {Promise<any>} The promise resolving to the fetched data.
- @param url
  \*/
  export const fetcher = (url: string): Promise<any> => {
  // return api().get(url).json();
  return api().delete().json();
  // return api().post(body, url).json()
  };
