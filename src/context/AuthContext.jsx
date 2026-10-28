// Login state for the whole app (in memory only: a refresh logs the user out).
import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

// In-memory only: a refresh logs the user out. Swap for a real session or token later.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return <Ctx.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>{children}</Ctx.Provider>;
}

export function RequireAuth({ children, reason }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname, reason }} />;
  return children;
}
