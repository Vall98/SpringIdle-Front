'use server'
import 'server-only'
import { cookies } from 'next/headers'
import { Token } from '@/app/lib/definitions'
 
export async function storeSession(token: Token) {
  cookies().set('session', token.access_token, {
    httpOnly: true,
    secure: true,
    expires: token.expires ? Date.parse(token.expires) : Date.now() + (30 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  })
}