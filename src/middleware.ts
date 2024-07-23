import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/' || path === '/signup/admin' || path === '/login' || path === '/login/admin' || path === '/login/staff' || path === '/login/student';
    
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/profile", 
        "/signup/:path*",
        "/login",
        "/login/:path*",
        "/colleges/:path*",
        "/staffs/:path*",
        "/"
    ]
};