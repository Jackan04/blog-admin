import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        setSignedIn(true);
      }
      setLoading(false);
    };

    run();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
