import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
    if (
      req.nextUrl.pathname.startsWith("/colleges") &&
      req.nextauth.token?.role !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    } else if (
      (req.nextUrl.pathname.startsWith("/sign-in") || req.nextUrl.pathname.startsWith("/sign-up")) && req.nextauth.token
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/dashboard", "/colleges/:path*"] };
