"use client"
import { useEffect, useState } from 'react';
import { getUserUUID } from '../../../../../../utils/getUserUUID'
import { getAuthUrl } from '@/app/api/mercadopago/authUrl';

export default function Page() {
  const [uuid, setUUID] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUUID();
  }, []);

  async function fetchUUID() {
    try {
      const userUUID = await getUserUUID();
      setUUID(userUUID);
      console.log('User UUID:', userUUID);
    } catch (error) {
      console.error('Failed to fetch UUID:', error);
      setError('Failed to fetch UUID. Please try again later.');
    }
  }

  const handleLinkClick = async () => {
    if (!uuid) {
      setError('Por seguridad cierre sesión y vuelva a iniciar sesión');
      return;
    }

    try {
      const authUrl = await getAuthUrl(uuid);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to link account:', error);
      setError('Failed to link account. Please try again later.');
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-2xl px-4 md:px-6">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Vincula tu cuenta de Mercado Pago
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Recibe pagos de forma segura y rápida directamente en tu cuenta de Mercado Pago.
            </p>
          </div>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            onClick={handleLinkClick}
          >
            Vincular cuenta
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
}
