import axios from "axios";

export const BASE_URL = "https://threew-task-social.onrender.com";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// Interceptor to add Token to every request
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;