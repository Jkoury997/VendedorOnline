// utils/actions.js
"use server"
const URL_API_QR = process.env.URL_API_QR;

export async function assignQR(qrGeneralUUID) {
    
    try {
      const response = await fetch(`${URL_API_QR}/api/qrs/qr-general/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrGeneralUUID,userUUID }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // Maneja la respuesta de la API aquí
      console.log('Action successful:', data);
      return data;
    } catch (error) {
      console.error('Error performing action with UUID:', error);
      throw error;
    }
  }
  