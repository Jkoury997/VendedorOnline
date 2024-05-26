import { cookies } from 'next/headers';

const URL_API_MERCADOPAGO = process.env.URL_API_MERCADOPAGO

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  try {

    if (!accessToken) {
      throw new Error('Access token not found in cookies');
    }
    
    // Hacer una solicitud a la API externa con encabezado de autorización
    const response = await fetch(`${URL_API_MERCADOPAGO}/api/mercadopago/callback?code=${code}&state=${state}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const externalData = await response.json();

    // Responder con un mensaje de éxito y los datos recibidos de la API externa
    return new Response(JSON.stringify({ message: 'Data received successfully', data: externalData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
