import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(user && token);

  const isAdmin = Boolean(
    user &&
    ["super_admin", "promoter_admin", "gym_admin"].includes(user.role)
  );

  const isPremium = Boolean(user?.is_premium);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  async function login(email, password) {
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const loggedUser = response.data.user;
      const authToken = response.data.token;

      setUser(loggedUser);
      setToken(authToken);

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", authToken);

      return loggedUser;
    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password, passwordConfirmation) {
    setLoading(true);

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const registeredUser = response.data.user;
      const authToken = response.data.token;

      setUser(registeredUser);
      setToken(authToken);

      localStorage.setItem("user", JSON.stringify(registeredUser));
      localStorage.setItem("token", authToken);

      return registeredUser;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      if (token) {
        await api.post("/logout");
      }
    } catch (error) {
      console.error("Error cerrando sesión", error);
    } finally {
      setUser(null);
      setToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      delete api.defaults.headers.common.Authorization;
    }
  }

  function updateUser(newUser) {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  async function refreshUser() {
    const response = await api.get("/profile");

    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    isPremium,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}