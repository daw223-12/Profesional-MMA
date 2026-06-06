import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute() {
  const { user } = useAuth();

  // si estÃ¡ logueado, no dejar entrar a login
  return user ? <Navigate to="/" replace /> : <Outlet />;
}