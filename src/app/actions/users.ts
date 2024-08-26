'use server'

import { fetchWithCredentials } from "./auth"

export async function getCurrentUserInfo() {
  const res = await fetchWithCredentials('/me', 'GET', undefined);
  if (res.error) {
    return;
  }

}