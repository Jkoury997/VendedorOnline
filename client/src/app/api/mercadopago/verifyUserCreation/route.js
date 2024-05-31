import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const URL_API_AUTH = process.env.URL_API_AUTH;

export async function GET(req) {

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const useruuid = cookieStore.get('useruuid');

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
  }

  try {
    const response = await fetch(`${URL_API_AUTH}/api/mercadopago/user/verify?useruuid=${useruuid.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify user creation');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error verifying user creation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
