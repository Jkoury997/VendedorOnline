// utils/actions.js
export async function assignQR(qrGeneralUUID, userUUID) {
    try {
      const response = await fetch(`/api/qr/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrGeneralUUID, userUUID }),
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
 
  export async function getQRGeneralsByUser(userUUID) {
    try {
      const response = await fetch(`/api/qr/listQRGeneralsByUser?useruuid=${userUUID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error performing action with UUID:', error);
      throw error;
    }
  }
 
