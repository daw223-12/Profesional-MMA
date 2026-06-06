import api from "./axios";

export function getAdminEvents(params = {}) {
  return api.get("/admin/events", { params });
}

export function createAdminEvent(data) {
  return api.post("/admin/events", data);
}

export function updateAdminEvent(id, data) {
  return api.put(`/admin/events/${id}`, data);
}

export function deleteAdminEvent(id) {
  return api.delete(`/admin/events/${id}`);
}

export function getAdminEvent(id) {
  return api.get(`/admin/events/${id}`);
}