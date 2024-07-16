import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/' || path === '/signup' || path === '/signup/admin' || path === '/login' || path === '/staff/login';
    
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/profile", 
        "/login",
        "/signup",
        "/verifyemail",
        "/admin",
        "/admin/manage-users",
        "/admin/manage-admins",
        "/signup/admin",
        "/staff/login",
    ]
};