import api from "./axios";

export function createPremiumCheckout() {
  return api.post("/stripe/premium-checkout");
}