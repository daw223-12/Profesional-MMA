import api from "./axios";

export function getAdminFighters(params = {}) {
  return api.get("/admin/fighters", { params });
}

export function getAdminFighter(id) {
  return api.get(`/admin/fighters/${id}`);
}

export function createAdminFighter(data) {
  return api.post("/admin/fighters", data);
}

export function updateAdminFighter(id, data) {
  return api.put(`/admin/fighters/${id}`, data);
}

export function deleteAdminFighter(id) {
  return api.delete(`/admin/fighters/${id}`);
}