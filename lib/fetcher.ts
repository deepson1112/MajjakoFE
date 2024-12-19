import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "./authUtils";
import { env } from "process";

const { handleJWTRefresh, logout } = AuthActions();

export const api = () => {
  return wretch(process.env.NEXT_PUBLIC_BASE_URL)
    .options({ credentials: "include" })
    .catcher(401, async (error: WretchError, request: Wretch) => {
      try {
        await handleJWTRefresh().json();
        return request
          .fetch()
          .unauthorized(() => {
            console.log("Unauthorized");
          })
          .json();
      } catch (err) {
        console.log("Error");
        await logout().json();
      }
    });
};
