import api from "./axios";

export function getAdminEventFights(eventId) {
  return api.get(`/admin/events/${eventId}/fights`);
}

export function getAdminFight(id) {
  return api.get(`/admin/fights/${id}`);
}

export function createAdminFight(eventId, data) {
  return api.post(`/admin/events/${eventId}/fights`, data);
}

export function updateAdminFight(id, data) {
  return api.put(`/admin/fights/${id}`, data);
}

export function deleteAdminFight(id) {
  return api.delete(`/admin/fights/${id}`);
}

export function attachFighterToFight(fightId, data) {
  return api.post(`/admin/fights/${fightId}/fighters`, data);
}

export function detachFighterFromFight(fightId, fighterId) {
  return api.delete(`/admin/fights/${fightId}/fighters/${fighterId}`);
}