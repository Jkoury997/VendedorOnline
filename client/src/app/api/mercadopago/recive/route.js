import { cookies } from 'next/headers';

const URL_API_AUTH = process.env.URL_API_AUTH

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const useruuid = cookieStore.get('useruuid');

  try {

    if (!accessToken) {
      throw new Error('Access token not found in cookies');
    }
    
    // Hacer una solicitud a la API externa con encabezado de autorización
    const response = await fetch(`${URL_API_AUTH}/api/mercadopago/user/callback?code=${code}&state=${state}`, {
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

    // Redirigir al dashboard
    const dashboardUrl = '/dashboard'; // Cambia esta URL a la de tu dashboard
    return new Response(null, {
      status: 302,
      headers: {
        'Location': dashboardUrl,
      },
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
