import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const api = "http://localhost:3000/api/auth";

const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false); 
  const navigate = useNavigate();

  // ✅ memoized login
  const login = useCallback(async (data) => {
    try {
      setAuthLoading(true);
      const res = await axiosInstance.post("/login", data);

      setUser(res.data.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  }, [navigate]);

  
  const fetchUser = useCallback(async () => {
    setAuthLoading(true)
    try {
      const res = await axiosInstance.get("/me");
      setUser(res.data.data);
    } catch (error) {
      // silent fail (user not logged in)
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // ✅ run only once
  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setAuthLoading(false);
    }
  }, []); // 🔥 no dependency

  return (
    <AuthContext.Provider value={{ user, login, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);   