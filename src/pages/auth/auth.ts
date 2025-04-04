import axios from "axios";

// api helper function
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async (
  style: string,
  borderColour: string,
  images: File[],
  accessToken: string
) => {
  const formData = new FormData();
  formData.append("style", style);
  formData.append("borderColour", borderColour);
  images.forEach((image) => {
    formData.append("images", image);
  });

  await axios.post(`${API_BASE_URL}/images/upload`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
