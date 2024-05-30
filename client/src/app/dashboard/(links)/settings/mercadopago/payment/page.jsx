"use client";

import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPayment } from '@/utils/mercadopago';
import { getUser } from '@/utils/auth';

const Page = () => {
    const NEXT_PUBLIC_MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
    initMercadoPago(NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: 'es-AR' });
    

    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState(null);


    async function fetchCreatePayment() {
        try {
            const userUUID = await getUser(); // Asumiendo que getUser es una función que obtiene el UUID del usuario
            const response = await createPayment(2000, userUUID, 300);

            return response.paymentLink.id;

        } catch (err) {
            setError("Error al crear el preference id.");
            console.error('Error al crear el preference id:', err);
        }
    }

    const handleBuy = async () =>{
        const id = await fetchCreatePayment()
        if(id){
            setPreferenceId(id)
        }
    }

    return (
        <div>
            <button onClick={handleBuy}>Comprar</button>
            {preferenceId && <Wallet initialization={{preferenceId}} customization={{ texts:{ valueProp: 'smart_option'}}} />}
        </div>
    );
};

export default Page;
