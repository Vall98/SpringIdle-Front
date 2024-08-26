import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isSessionNotExpired } from '@/app/actions/auth';

export const authMandatoryPaths = [
  "/me",
]
const authForbiddenPaths = [
  "/join",
  "/login",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userIsAuthenticated = await isSessionNotExpired();

  if ((userIsAuthenticated && authForbiddenPaths.includes(pathname)) ||
    (!userIsAuthenticated && authMandatoryPaths.includes(pathname))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

const routes = authMandatoryPaths.concat(authForbiddenPaths);
export const config = {
  matcher: routes,
}