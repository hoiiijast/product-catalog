import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // update to backend port
});
console.log(import.meta.env.VITE_API_URL);

export default api;
