import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies for authentication if needed
});

export default axiosInstance;
