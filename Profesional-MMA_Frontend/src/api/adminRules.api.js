import api from "./axios";

export function getAdminRules(params = {}) {
  return api.get("/admin/rules", { params });
}

export function getAdminRule(id) {
  return api.get(`/admin/rules/${id}`);
}

export function createAdminRule(data) {
  return api.post("/admin/rules", data);
}

export function updateAdminRule(id, data) {
  return api.put(`/admin/rules/${id}`, data);
}

export function deleteAdminRule(id) {
  return api.delete(`/admin/rules/${id}`);
}