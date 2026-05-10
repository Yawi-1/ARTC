import { createContext, useState, useEffect, useContext } from "react";
import useApi from '../hooks/useApi'
const TransactionContext = createContext(null)
export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([])
    const { callApi, loading, error } = useApi();

    const [filters, setFilters] = useState({
        type: "all",
        branch: "all",
        category: "all",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const itemsPerPage = 20;

    const fetchTransactions = async () => {
        const query = new URLSearchParams({
            page: currentPage,
            limit: itemsPerPage,
            ...(filters.type !== "all" && { type: filters.type }),
            ...(filters.branch !== "all" && { branch: filters.branch }),
            ...(filters.category !== "all" && { category: filters.category }),
        }).toString();

        const res = await callApi({
            method: "GET",
            url: `/transactions?${query}`,
        });
        setTransactions(res.data);
        setTotalExpense(res.totalExpense);
        setTotalIncome(res.totalIncome);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentPage, filters]);

    const isProfit = totalIncome >= totalExpense;

    return (<TransactionContext.Provider value={{
        transactions,
        setTransactions,
        loading,
        error,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
        totalCount,
        totalIncome,
        totalExpense,
        isProfit,
    }}>
        {children}
    </TransactionContext.Provider>)
}

export const useTransaction = () => useContext(TransactionContext)