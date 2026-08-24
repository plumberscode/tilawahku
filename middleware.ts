import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/murojaah") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/prototype");

  // Jika user sudah memiliki session token aktif
  if (sessionToken) {
    // Jika mengakses halaman auth (login/register) atau homepage utama (/), arahkan langsung ke dashboard
    if (isAuthRoute || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // Jika user belum login dan mencoba mengakses rute yang dilindungi
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes, termasuk /api/auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - file statis (.webm, .jpg, .png, .svg, .webp, .ico, dll.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:webm|jpg|jpeg|png|gif|svg|webp|ttf|woff|woff2)).*)",
  ],
};
