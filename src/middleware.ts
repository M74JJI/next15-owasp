import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // Vulnerable middleware for paths under /broken-access-control/vulnerable
  /*
  if (pathname.startsWith("/broken-access-control/vulnerable/admin")) {
    const userCookie = request.cookies.get("user")?.value;
    let user = null;

    try {
      if (userCookie) {
        user = JSON.parse(userCookie);
      }
    } catch (e) {
      // If cookie is invalid JSON, treat as no user
      user = null;
    }

    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
 */

  // Secure middleware for paths under /broken-access-control/secure
  /*
  if (pathname.startsWith("/broken-access-control/secure/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
*/

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/broken-access-control/vulnerable/admin/:path*",
    "/broken-access-control/secure/admin/:path*",
  ],
};
