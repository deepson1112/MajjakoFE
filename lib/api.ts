// import { ApiClient } from "@/types/ApiClient";
// import { Session } from "next-auth";

// const getApiClient = async (session?: Session | null) => {
//   return new ApiClient({
//     BASE: process.env.API_URL,
//     HEADERS: {
//       ...(session && {
//         Authorization: `JWT ${session.user.access}`,
//       }),
//     },
//   });
// };

// export { getApiClient };
