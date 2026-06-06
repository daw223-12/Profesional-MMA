import api from "./axios";

export function getAdminPromotions(params = {}) {
  return api.get("/admin/promotions", { params });
}

export function getAdminPromotion(id) {
  return api.get(`/admin/promotions/${id}`);
}

export function createAdminPromotion(data) {
  return api.post("/admin/promotions", data);
}

export function updateAdminPromotion(id, data) {
  return api.put(`/admin/promotions/${id}`, data);
}

export function deleteAdminPromotion(id) {
  return api.delete(`/admin/promotions/${id}`);
}