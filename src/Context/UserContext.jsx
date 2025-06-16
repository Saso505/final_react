import { useEffect, useState, createContext } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    // Load user token from localStorage, or return null if not found
    return localStorage.getItem("userToken") || null;
  });

  const [userId, setUserId] = useState(() => {
    // Load userId from localStorage, or return null if not found
    return localStorage.getItem("userId") || null;
  });

  useEffect(() => {
    // When userData changes, update it in localStorage
    if (userData) {
      localStorage.setItem("userToken", userData);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userData]);

  useEffect(() => {
    // When userId changes, update it in localStorage
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  useEffect(() => {
    // Update context with data from localStorage when the app starts
    const storedUserData = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedUserData && storedUserId) {
      setUserData(storedUserData);
      setUserId(storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
