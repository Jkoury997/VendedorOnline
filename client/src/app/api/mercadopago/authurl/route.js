// pages/api/mercadopago/auth-url.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const MERCADOPAGO_CLIENT_ID = process.env.MERCADOPAGO_CLIENT_ID;
const MERCADOPAGO_REDIRECT_URI = process.env.MERCADOPAGO_REDIRECT_URI;
const MERCADOPAGO_APP_ID = process.env.MERCADOPAGO_APP_ID

export async function GET(req) {

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const useruuid = cookieStore.get("useruuid")

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
  }
  if (!useruuid) {
    return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
  }

  try {

    const authUrl = `https://auth.mercadopago.com.ar/authorization?response_type=code&client_id=${MERCADOPAGO_APP_ID}&redirect_uri=${MERCADOPAGO_REDIRECT_URI}&state=${useruuid.value}`;


    return NextResponse.json({ authUrl: authUrl }, { status: 200 });
  } catch (error) {
    console.error('Error fetching auth URL:', error);
    return NextResponse.json({ message: 'Failed to fetch auth URL' }, { status: 500 });
  }
}
