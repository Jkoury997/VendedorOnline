// utils/actions.js
export async function assignQR(uuid) {
    try {
      const response = await fetch(`/api/some-endpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid }),
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
  