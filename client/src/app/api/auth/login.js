"use server"
import { cookies } from 'next/headers'

const URL_API_AUTH = process.env.URL_API_AUTH;

export async function login(email, password) {
  try {
    const response = await fetch(`${URL_API_AUTH}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const cookieStore = cookies();

    // Almacenar los tokens en las cookies
    cookieStore.set("accessToken",data.accessToken)
    cookieStore.set("refreshToken",data.refreshToken)
    

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function logout() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    // Eliminar las cookies de los tokens
    cookieStore.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });
    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });

    // Realizar una solicitud a tu API para invalidar los tokens en el servidor
    const response = await fetch(`${URL_API_AUTH}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken.value })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}
