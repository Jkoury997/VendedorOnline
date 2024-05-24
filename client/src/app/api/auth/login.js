"use server"

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

    // Almacenar los tokens en las cookies
    document.cookie = `accessToken=${data.accessToken};path=/;max-age=${15 * 60}`;
    document.cookie = `refreshToken=${data.refreshToken};path=/;max-age=${30 * 24 * 60 * 60}`;

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}