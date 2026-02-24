import { NextResponse } from "next/server"

export default function middleware(request) {
  const token = request.cookies.get("sb-access-token")

  if (!token && request.nextUrl.pathname.startsWith("/mi-cuenta")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/mi-cuenta/:path*"],
}