import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
    access_token: 'TU_ACCESS_TOKEN'
});

export async function POST(req) {
    const body = await req.json();

    const preference = {
        items: body.items,
        marketplace: 'tu_marketplace_id',
        marketplace_fee: 10, // Comisión del marketplace
        back_urls: {
            success: 'https://www.tu-sitio.com/success',
            failure: 'https://www.tu-sitio.com/failure',
            pending: 'https://www.tu-sitio.com/pending'
        },
        auto_return: 'approved',
        notification_url: 'https://www.tu-sitio.com/notifications',
        statement_descriptor: 'Tienda',
        external_reference: 'tu_referencia',
        // Configuración de split de pago
        differential_pricing: {
            id: 12345678
        },
        metadata: {
            merchant_order_id: '1234'
        },
        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_83958037@testuser.com',
            phone: {
                area_code: '11',
                number: 22223333
            },
            identification: {
                type: 'DNI',
                number: '12345678'
            },
            address: {
                street_name: 'Falsa',
                street_number: 123,
                zip_code: '1111'
            }
        },
        additional_info: 'Información adicional',
        external_reference: 'ReferenciaExterna',
        purpose: 'wallet_purchase'
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        return NextResponse.json({ preference_id: response.body.id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating preference' }, { status: 500 });
    }
}
