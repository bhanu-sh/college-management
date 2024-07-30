import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
    if (
      req.nextUrl.pathname === "/colleges" &&
      req.nextauth.token?.role !== "Admin"
    ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    },
  },
)

export const config = { matcher: ["/dashboard", "/colleges"] }