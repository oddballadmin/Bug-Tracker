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
