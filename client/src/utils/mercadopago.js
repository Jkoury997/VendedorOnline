// utils/mercadopago.js

export async function getAuthUrl (){
  try{
    const response = await fetch(`/api/mercadopago/authurl`)
    if (!response.ok) {
      throw new Error('Failed to verify user creation');
    }
    const data = await response.json();
    console.log(data)
    return data.authUrl
  } catch (error) {
    console.error('Error get auth utl:', error);
    return false;
  }
}
  
export async function verifyUserCreation() {
    try {
      const response = await fetch(`/api/mercadopago/verifyUserCreation`);
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
  