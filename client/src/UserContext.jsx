import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/auth/profile", {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
}
