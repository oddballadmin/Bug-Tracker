import axios from "axios";
export const signUp = async (userData: {
  username: string;
    email: string;
    password: string;
}) => {
  try {
    const response = await axios.post(`users/create/`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
}

export const login = async (creds: {
  username: string;
  password: string;
}) => {
  try {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Cleared auth cookie before login");
    const response = await axios.post(`users/login/`, creds, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}