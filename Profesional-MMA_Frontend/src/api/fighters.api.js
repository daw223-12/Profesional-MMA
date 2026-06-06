import api from "./axios";

export function getFighters(params = {}) {
  return api.get("/fighters", { params });
}