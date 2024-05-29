import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';


const URL_API_MERCADOPAGO = process.env.URL_API_MERCADOPAGO;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userUUID = searchParams.get('userUUID');
  const amount = searchParams.get('amount')
    const revendedorAmount = searchParams.get("revendedorAmount") 
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    return NextResponse.json({ message: 'Access token not found' }, { status: 401 });
  }
  const idempotencyKey = await uuidv4(); 

  try {
    const response = await fetch(`${URL_API_MERCADOPAGO}/api/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': idempotencyKey,
        'Authorization': `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({amount, userUUID, revendedorAmount })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create payment');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error create payment:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
