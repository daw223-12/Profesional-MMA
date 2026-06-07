import axios from "axios";

const api = axios.create({
  baseURL: "http://70.156.160.30/:443/api",
  headers: {
    Accept: "application/json",
  },
});

const token = localStorage.getItem("token");

if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;