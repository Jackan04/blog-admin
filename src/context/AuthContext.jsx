import { createContext, useState, useContext, useEffect } from "react";
import BlogService from "../services/blogService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  async function login(credentials) {
    const service = new BlogService();
    await service.login(credentials);
    setSignedIn(true);
  }

  function logout() {
    const service = new BlogService();
    service.logout();
    setSignedIn(false);
  }

  useEffect(() => {
    const run = () => {
      const token = localStorage.getItem("jwt");
      setSignedIn(Boolean(token));
      setLoading(false);
    };

    run();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
