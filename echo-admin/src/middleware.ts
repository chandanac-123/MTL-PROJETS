import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/forget-password",
  "/reset-password",
  "/reset-success",
  "/product/id",
  "/admin-reset-invite"
];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/orders",
  "/product-management",
  "/stock-management",
  "/customer-management",
  "/offers-coupons",
  "/banners",
  "/referrals",
  "/customer-support",
  "/user-management",
  "/settings",
  "/notifications",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token");
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const isExcludedRoute = ["/reset-password"].includes(pathname);
  const isExcludedAdminInviteRoute = ["/admin-reset-invite"].includes(pathname);

  if (isPublicRoute && token && !isExcludedRoute && !isExcludedAdminInviteRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
