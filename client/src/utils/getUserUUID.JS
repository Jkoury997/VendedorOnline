"use server"
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export async function getUserUUID() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");

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
        throw new Error("Invalid or expired access token");
    }
}