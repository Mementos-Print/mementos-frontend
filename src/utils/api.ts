import axios from "axios";
const API = axios.create({
  baseURL: "https://mementos-backend-jqdl.onrender.com/",
  withCredentials: true,
});
export default API;
