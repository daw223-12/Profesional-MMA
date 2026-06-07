import api from "./axios";

export function getEvents(params = {}) {
  return api.get("/events", { params });
}

export function getPastEvents(params = {}) {
  return api.get("/events/past", { params });
}

export function getEvent(id) {
  return api.get(`/events/${id}`);
}

export function getEventFights(id) {
  return api.get(`/events/${id}/fights`);
}