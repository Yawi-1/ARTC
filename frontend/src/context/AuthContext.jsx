import React, { createContext, useState, useContext } from "react";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    axios.defaults.withCredentials = true
    const api = 'http://localhost:3000/api/auth'
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false)

    const login = async (data) => {
        setAuthLoading(true)
        try {
            const res = await axios.post(`${api}/login`, data)
            console.log(res.data)
        } catch (error) {
            alert(error.response?.data?.message || "Login failed")
        } finally {
            setAuthLoading(false)
        }
    }


    return (
        <AuthContext.Provider value={{ user, setUser, login, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);