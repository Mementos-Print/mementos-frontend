// api helper function
import axios from "axios";

const API_BASE_URL = "https://mementos-backend.onrender.com";
export const uploadImage = async (
  borderColour: string,
  images: File[],
  accessToken: string
) => {
  const formData = new FormData();
  formData.append("borderColour", borderColour);
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

export const login = async(email:string, name:string)=>{
  const response = await axios.post(`${API_BASE_URL}/users/loginUser`, {
    email,
    name
  });
  return response.data;
}
