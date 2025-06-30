// api helper function
import axios from "axios";

const API_BASE_URL = "https://mementos-backend-jqdl.onrender.com";
export const uploadPolaroid = async (
  borderColor: string,
  images: File[],
  accessToken: string
) => {  
  const formData = new FormData();
  formData.append("borderColor", borderColor);
  images.forEach((image) => {
    formData.append("images", image);
  });

  await axios.post(`${API_BASE_URL}/images/uploadPolaroid`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const login = async(email:string, password:string)=>{
  const response = await axios.post(`${API_BASE_URL}/users/loginUser`, {
    email,
    password
  });
  return response.data;
}
export const signup = async(email:string, name:string,password: string)=>{
  const response = await axios.post(`${API_BASE_URL}/users/signupUser`, {
    email,
    name,
    password,
  });
  return response.data;
}
