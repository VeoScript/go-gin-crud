import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.API_URL_DEVELOPMENT
      : process.env.API_URL_PRODUCTION,
  timeout: 3000,
  withCredentials: true,
});

export default api;
