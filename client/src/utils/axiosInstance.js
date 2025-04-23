import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://expense-tracker-1-9j3j.onrender.com/api/v1" // Production URL
      : "http://localhost:8080/api/v1",
});

export default axiosInstance;
