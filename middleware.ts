import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const redirect = (to: string) => {
    NextResponse.redirect(new URL(to, request.url), 307);
  };

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  if (token) {
    if (pathname.includes("/admin")) {
      return res;
    }
    if (pathname.includes("/login")) {
      return redirect("/");
    }
    if (pathname.includes("/register")) {
      return redirect("/");
    }
  }

  if (pathname.includes("/login")) {
    return res;
  }
  if (pathname.includes("/register")) {
    return res;
  }
  return NextResponse.rewrite(new URL("/unauthorized", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
