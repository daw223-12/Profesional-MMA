import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PremiumRoute({ children }) {
  const { user } = useAuth();

  const isPremium = user?.is_premium === true;

  useEffect(() => {
    if (!isPremium) {
      alert("Necesitas ser premium para acceder a esta sección.");
    }
  }, [isPremium]);

  if (!isPremium) {
    return <Navigate to="/premium" replace />;
  }

  return children;
}

export default PremiumRoute;