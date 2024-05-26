"use server"
const URL_API_AUTH = process.env.URL_API_AUTH;
import { cookies } from 'next/headers';

export async function refreshAccessToken() {
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
