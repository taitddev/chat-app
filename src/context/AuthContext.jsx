import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE =
  JSON.parse(
    localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_USER_KEY)
  ) || null;

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(INITIAL_STATE);

  const value = { user, setUser };

  useEffect(() => {
    localStorage.setItem(
      import.meta.env.VITE_LOCAL_STORAGE_USER_KEY,
      JSON.stringify(user)
    );
  }, [user]);

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthContextProvider, useAuth };
