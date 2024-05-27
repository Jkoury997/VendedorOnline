"use server";
const URL_API_AUTH = process.env.URL_API_AUTH;
const JWT_SECRET = process.env.JWT_SECRET;
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

async function refreshAccessToken() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token not found");
    }

    try {
        const response = await fetch(`${URL_API_AUTH}/api/token/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: refreshToken.value })
        });

        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }

        const data = await response.json();
        console.log('New access token:', data.accessToken); // Debug log
        return data.accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Unable to refresh access token');
    }
}

export async function getUser() {
    const cookieStore = cookies();
    let accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");

    if (!accessToken) {
        throw new Error("Access token not found");
    }

    try {
        // Verificar el JWT
        const { payload } = await jwtVerify(accessToken.value, new TextEncoder().encode(JWT_SECRET));
        // Obtener el UUID del payload
        const userUUID = payload.uuid;
        return userUUID;
    } catch (error) {
        console.error("Failed to verify JWT:", error);

        // Intentar refrescar el token si es inválido o ha expirado
        if (refreshToken) {
            try {
                const newAccessToken = await refreshAccessToken();
                cookieStore.set("accessToken", newAccessToken);

                // Reintentar verificar el nuevo JWT
                const { payload } = await jwtVerify(newAccessToken, new TextEncoder().encode(JWT_SECRET));
                const userUUID = payload.uuid;
                return userUUID;
            } catch (refreshError) {
                console.error("Failed to refresh access token:", refreshError);
                throw new Error("Invalid or expired access token and failed to refresh");
            }
        } else {
            throw new Error("Invalid or expired access token and no refresh token available");
        }
    }
}
