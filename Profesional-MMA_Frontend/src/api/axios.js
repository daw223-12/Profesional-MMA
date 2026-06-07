import axios from "axios";

const api = axios.create({
  baseURL: "https://professionalmma.ddns.net/api",
  headers: {
    Accept: "application/json",
  },
});

const token = localStorage.getItem("token");

if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;