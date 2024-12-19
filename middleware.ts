import type { NextRequest } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/",
};

export async function middleware(request: NextRequest) {
  const refresh = request.cookies.getAll();
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const access_token = request.cookies.get("accessToken")?.value;
  console.log("This is refresh", refresh);

  console.log("Hello World 🥰🥰");
}
