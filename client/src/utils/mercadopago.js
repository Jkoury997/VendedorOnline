// utils/mercadopago.js

export async function getAuthUrl(useruuid) {
    const response = await fetch(`/api/mercadopago/authurl?useruuid=${useruuid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch auth URL');
    }
  
    const data = await response.json();
    console.log(data);
    return data.authUrl;
  }
  
  export async function verifyUserCreation(userUUID) {
    try {
      const response = await fetch(`/api/mercadopago/verifyUserCreation?userUUID=${userUUID}`);
      if (!response.ok) {
        throw new Error('Failed to verify user creation');
      }
      const data = await response.json();
      return data.isCreated;
    } catch (error) {
      console.error('Error verifying user creation:', error);
      return false;
    }
  }

export async function createPayment(amount, userUUID, revendedorAmount ){
  try{
    const response = await fetch(`/api/mercadopago/createPayment?userUUID=${userUUID}&amount=${amount}&revendedorAmount=${revendedorAmount}`)
    if (!response.ok) {
      throw new Error('Failed to verify user creation');
    }
    const data = await response.json();
    return data
  }catch (error) {
    console.error('Error create payment:', error);
    return false;
  }
}
  