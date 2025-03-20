import { NextRequest, NextResponse } from 'next/server'

import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { options } from './app/api/auth/[...nextauth]/options'
import { cookies } from 'next/headers'

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const response = NextResponse.redirect(
      new URL('/dashboard/request', req.url)
    )
    const cookiesStore = cookies()
    const oldCookieName =
      process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token'
    const oldCookie = cookiesStore.get(oldCookieName)

    if (oldCookie && !cookiesStore.has(options.cookies!.sessionToken!.name)) {
      response.cookies.set(oldCookieName, 'deleted', {
        ...options.cookies?.sessionToken?.options,
        maxAge: 0,
      })
      response.cookies.set(
        options.cookies!.sessionToken!.name,
        oldCookie.value,
        {
          ...options.cookies?.sessionToken?.options,
        }
      )
      return response
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    
  },
  {
    cookies: options.cookies,
    callbacks: {
      authorized({ req, token }) {
        if (token) {
          return true
        }
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return true
        }
        return false
      },
    },
  }
)

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
