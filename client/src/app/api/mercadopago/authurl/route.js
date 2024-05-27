// pages/api/mercadopago/auth-url.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_MERCADOPAGO = process.env.URL_API_MERCADOPAGO;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const useruuid = searchParams.get('useruuid');
  console.log(useruuid);

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
  }

  try {
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
    console.log(data);
    return NextResponse.json({ authUrl: data.authUrl }, { status: 200 });
  } catch (error) {
    console.error('Error fetching auth URL:', error);
    return NextResponse.json({ message: 'Failed to fetch auth URL' }, { status: 500 });
  }
}
