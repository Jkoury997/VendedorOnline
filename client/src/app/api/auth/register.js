"use server"

const URL_API_AUTH = process.env.URL_API_AUTH;

export async function register(userData) {
  try {
    const response = await fetch(`${URL_API_AUTH}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data.message) {
      throw new Error("Registration failed");
    }

    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}