import api from "./axios";

export function getAdminUsers(params = {}) {
  return api.get("/admin/users", { params });
}

export function getAdminUser(id) {
  return api.get(`/admin/users/${id}`);
}

export function createAdminUser(data) {
  return api.post("/admin/users", data);
}

export function updateAdminUser(id, data) {
  return api.put(`/admin/users/${id}`, data);
}

export function deleteAdminUser(id) {
  return api.delete(`/admin/users/${id}`);
}