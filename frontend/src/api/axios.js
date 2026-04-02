import axios from "axios";

const API = axios.create({
  baseURL: "https://threew-task-social.onrender.com/api",
});

export default API;