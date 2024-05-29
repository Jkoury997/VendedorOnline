"use client";

import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPayment } from '@/utils/mercadopago';
import { getUser } from '@/utils/auth';

const Page = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: 'es-AR' });
        fetchCreatePayment();
    }, []);

    async function fetchCreatePayment() {
        try {
            const userUUID = await getUser(); // Asumiendo que getUser es una función que obtiene el UUID del usuario
            const response = await createPayment(2000, userUUID, 300);
            setPreferenceId(response.paymentLink.id);
        } catch (err) {
            setError("Error al crear el preference id.");
            console.error('Error al crear el preference id:', err);
        }
    }

    return (
        <div>
            {error && <div>{error}</div>}
            {preferenceId ? (
                <Wallet 
                    initialization={{ preferenceId: preferenceId, redirectMode: 'blank'  }} 
                    customization={{ texts: { valueProp: 'smart_option' } }}

                />
            ) : (
                <div>Cargando...</div>
            )}
        </div>
    );
};

export default Page;
