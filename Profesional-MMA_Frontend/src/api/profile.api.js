import api from "./axios";

export function getProfile() {
  return api.get("/profile");
}

export function updateProfile(data) {
  return api.put("/profile", data);
}

export function deleteProfile() {
  return api.delete("/profile");
}