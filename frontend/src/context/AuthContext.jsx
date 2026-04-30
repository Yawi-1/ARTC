import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();


  const login = useCallback(async (data) => {
    try {
      setAuthLoading(true);
      const res = await axiosInstance.post("/auth/login", data);

      setUser(res.data.data);
      alert(res.data.message)
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      const res = await axiosInstance.post('/auth/logout')
      alert(res.data.message)
      setUser(null)
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }

  }, [])


  const fetchUser = useCallback(async () => {
    setAuthLoading(true)
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);


  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setAuthLoading(false);
    }
  }, []); // 🔥 no dependency

  return (
    <AuthContext.Provider value={{ user, login, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);   