import { useContext, useEffect, createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import useApi from "../hooks/useApi";

const ClientContext = createContext()

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([])
    const { callApi, loading, error } = useApi()

    const fetchClients = async () => {
        const res = await callApi({
            method: 'GET',
            url: '/clients'
        })
        setClients(res.data)
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return (<ClientContext.Provider value={{ clients,setClients}}>
        {children}
    </ClientContext.Provider>)
}

export const useClient = () => useContext(ClientContext)