import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
const BranchContext = createContext()

export const BranchProvider = ({ children }) => {
    const [branches, setBranches] = useState([])
    const [branchLoading, setBranchLoading] = useState(false)


    const fetchBranches = async () => {
        setBranchLoading(true)
        try {
            const res = await axiosInstance.get('/branch')
            setBranches(res.data.data)
        } catch (error) {
            console.log('Branch COntext error ', error)
        } finally {
            setBranchLoading(false)
        }
    }
    useEffect(() => {
        fetchBranches()
    }, [])

    return (<BranchContext.Provider value={{ branches, branchLoading }}>
        {children}
    </BranchContext.Provider>)
}

export const useBranch = () => useContext(BranchContext)