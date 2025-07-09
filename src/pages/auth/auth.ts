// api helper function
import API from "../../utils/api";


// const API_BASE_URL = "https://mementos-backend-jqdl.onrender.com";
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

  await API.post(`images/uploadPolaroid`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const login = async(email:string, password:string)=>{
  const response = await API.post(`users/loginUser`, {
    email,
    password
  });
  return response.data;
}
export const signup = async(email:string, name:string,password: string)=>{
  const response = await API.post(`users/signupUser`, {
    email,
    name,
    password,
  });
  return response.data;
}
export const logout = async(accessToken: string)=>{
  const response = await API.delete(`tokens/logoutUser`,{
    headers:{
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}