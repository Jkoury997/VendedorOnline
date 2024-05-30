"use client";

import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPayment } from '@/utils/mercadopago';
import { getUser } from '@/utils/auth';

const Page = () => {
    const NEXT_PUBLIC_MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
    console.log(NEXT_PUBLIC_MP_PUBLIC_KEY)
    initMercadoPago(NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: 'es-AR' });
    

    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCreatePayment();
    }, []);

    async function fetchCreatePayment() {
        try {
            const userUUID = await getUser(); // Asumiendo que getUser es una función que obtiene el UUID del usuario
            const response = await createPayment(2000, userUUID, 300);
            if (response && response.paymentLink.id) {
                setPreferenceId(response.paymentLink.id);
            } else {
                throw new Error('Invalid response from createPayment');
            }
        } catch (err) {
            setError("Error al crear el preference id.");
            console.error('Error al crear el preference id:', err);
        }
    }

    useEffect(() => {
        if (preferenceId) {
            console.log('Preference ID:', preferenceId);
        }
    }, [preferenceId]);

    return (
        <div>
            {error && <div>{error}</div>}
            {preferenceId ? (
                <>
                    <p>{preferenceId}</p>
                    <Wallet 
                        initialization={{ preferenceId: preferenceId, redirectMode: 'modal' }} 
                        customization={{ texts: { valueProp: 'smart_option' } }}
                    />
                </>
            ) : (
                <div>Cargando...</div>
            )}
        </div>
    );
};

export default Page;
