// pages/api/qr/assign-qr.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_QR = process.env.URL_API_QR;

export async function POST(req) {

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
  }

  try {
    const { qrGeneralUUID, userUUID } = await req.json();

    const response = await fetch(`${URL_API_QR}/api/qrs/qr-general/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`
      },
      body: JSON.stringify({ qrGeneralUUID, userUUID }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Maneja la respuesta de la API aquí
    console.log('Action successful:', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error performing action with UUID:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
