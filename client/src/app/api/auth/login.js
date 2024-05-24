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
  
      
  
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }