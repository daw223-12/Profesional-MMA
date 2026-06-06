import api from "./axios";

export function getAdminGyms(params = {}) {
  return api.get("/admin/gyms", { params });
}

export function getAdminGym(id) {
  return api.get(`/admin/gyms/${id}`);
}

export function createAdminGym(data) {
  return api.post("/admin/gyms", data);
}

export function updateAdminGym(id, data) {
  return api.put(`/admin/gyms/${id}`, data);
}

export function deleteAdminGym(id) {
  return api.delete(`/admin/gyms/${id}`);
}