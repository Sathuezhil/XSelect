import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasSession(request: NextRequest) {
  return request.cookies.getAll().some((cookie) => {
    return (
      cookie.name === "next-auth.session-token" ||
      cookie.name.startsWith("next-auth.session-token.") ||
      cookie.name === "__Secure-next-auth.session-token" ||
      cookie.name.startsWith("__Secure-next-auth.session-token.")
    );
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  const isLogin = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && !isLogin;
  const isPublicPost =
    request.method === "POST" && (pathname === "/api/contact" || pathname === "/api/newsletter");
  const isProtectedApi = pathname.startsWith("/api/") && !isPublicPost;

  if (isLogin && hasSession(request)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if ((isAdminPage || isProtectedApi) && !hasSession(request)) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/:path*"],
};
