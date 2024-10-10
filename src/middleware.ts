import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("gists.access_token")?.value;
  const publicRoutes = ["/", "/login"]; // Ajoutez ici d'autres routes publiques si nécessaire

  if (!accessToken && !publicRoutes.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};