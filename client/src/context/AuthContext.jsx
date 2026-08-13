import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, getMeRequest } from "../api/auth";

const AuthContext = createContext(null);

const TOKEN_KEY = "skillnest_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  // "checking" avoids a flash of logged-out UI while we verify a stored token
  const [status, setStatus] = useState("checking"); // checking | authenticated | guest

  useEffect(() => {
    const verifyStoredToken = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setStatus("guest");
        return;
      }
      try {
        const { user: me } = await getMeRequest();
        setUser(me);
        setStatus("authenticated");
      } catch (err) {
        // Token is invalid or expired
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        setStatus("guest");
      }
    };
    verifyStoredToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest({ email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    setStatus("authenticated");
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await registerRequest({ name, email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    setStatus("authenticated");
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setStatus("guest");
  };

  const value = {
    user,
    token,
    status, // "checking" | "authenticated" | "guest"
    isAuthenticated: status === "authenticated",
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
