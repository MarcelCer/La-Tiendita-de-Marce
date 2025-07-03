import React, { createContext, useState, useContext } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (userData) => {
    const email = userData.email;
    const token = `fake-token-${email}`;

    localStorage.setItem("authToken", token);
    setUser(email);
    setAdmin(email === "admin@gmail.com"); // ✔️ comparación correcta
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setAdmin(false);
  };

  {
    /*function verificacionLog() {
    const userToken = localStorage.getItem("authToken");
    if (userToken && userToken == "fake-token-admin@gmail.com") {
      setAdmin(true);
      return;
    }
    if (userToken) {
      setUser(userToken);
    }
  }*/
  }

  async function verificacionLog() {
    const userToken = localStorage.getItem("authToken");

    if (userToken) {
      const email = userToken.replace("fake-token-", "");
      setUser(email);
      setAdmin(email === "admin@gmail.com"); // ← Aquí se asegura que admin quede bien seteado
    } else {
      setUser(null);
      setAdmin(false);
    }
    return Promise.resolve();
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, admin, verificacionLog }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = () => useContext(AuthContext);
