import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Verificar si el usuario está autenticado
  const authCookie = request.cookies.getAll().find(c => c.name.includes('auth-token'))
  const hasAuth = !!authCookie

  if (!hasAuth && request.nextUrl.pathname.startsWith("/mi-cuenta")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}

export const config = {
  matcher: ["/mi-cuenta/:path*"],
}