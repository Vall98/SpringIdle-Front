'use server'

import { fetchWithCredentials } from "./auth"

export async function getCurrentUserInfo(): Promise<any> {
  return await fetchWithCredentials('/users/me', 'GET', undefined);
}