'use server'
import 'server-only'
import { cookies } from 'next/headers'
import { Token } from '@/app/lib/definitions'

const REFRESH_OFFSET = 10 * 60 * 1000 //refresh X minutes before token expires
const SESSION = "session";
const SESSION_EXPIRES = "session_expires";

export async function storeSession(token: Token) {
  const expires: number = token.expires ? Date.parse(token.expires) : Date.now() + (30 * 60 * 1000);
  cookies().set(SESSION, token.token_type + " " + token.access_token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
  cookies().set(SESSION_EXPIRES, expires.toString(), {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(): Promise<void> {
  cookies().delete(SESSION);
  cookies().delete(SESSION_EXPIRES);
  return; // Explicitly return void
}

async function refreshSession() {
  // TODO
}

export async function checkTokenIsValid(): Promise<string | undefined> {
  const token = cookies().get(SESSION)?.value;
  if (!token) {
    return undefined;
  }
  const expires = parseInt(cookies().get(SESSION_EXPIRES)?.value || '');
  if (!expires || expires < Date.now()) {
    deleteSession();
    return undefined;
  }
  if (expires < Date.now() + REFRESH_OFFSET) {
    refreshSession();
  }
  return token;
}