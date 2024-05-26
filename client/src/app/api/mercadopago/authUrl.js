// utils/authService.js
"use server"
import { cookies } from "next/headers";

const URL_API_MERCADOPAGO = process.env.URL_API_MERCADOPAGO;

export async function getAuthUrl(useruuid) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("accessToken")
  const response = await fetch(`${URL_API_MERCADOPAGO}/api/mercadopago/auth-url/${useruuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken.value}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch auth URL');
  }

  const data = await response.json();
  console.log(data)
  return data.authUrl;
}
