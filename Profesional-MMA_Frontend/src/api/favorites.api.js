import api from "./axios";

export function getFavorites() {
  return api.get("/favorites");
}

export function addFavorite(eventId) {
  return api.post(`/favorites/${eventId}`);
}

export function removeFavorite(eventId) {
  return api.delete(`/favorites/${eventId}`);
}