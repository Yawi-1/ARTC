import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";

import useApi from "../hooks/useApi";

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);

  const { callApi, loading, error } = useApi();

  const [filters, setFilters] = useState({
    type: "all",
    branch: "all",
    category: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [summary, setSummary] = useState({
    totalPages: 1,
    totalCount: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  const itemsPerPage = 20;

  const fetchTransactions = useCallback(async () => {

    const query = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,

      ...(filters.type !== "all" && {
        type: filters.type,
      }),

      ...(filters.branch !== "all" && {
        branch: filters.branch,
      }),

      ...(filters.category !== "all" && {
        category: filters.category,
      }),

    }).toString();

    const res = await callApi({
      method: "GET",
      url: `/transactions?${query}`,
    });

    if (!res) return;

    setTransactions(res.data);

    setSummary({
      totalPages: res.totalPages,
      totalCount: res.totalCount,
      totalIncome: res.totalIncome,
      totalExpense: res.totalExpense,
    });

  }, [currentPage, filters, callApi]);



  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const isProfit =
    summary.totalIncome >= summary.totalExpense;



  const value = useMemo(() => ({
    transactions,
    setTransactions,
    loading,
    error,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages: summary.totalPages,
    totalCount: summary.totalCount,
    totalIncome: summary.totalIncome,
    totalExpense: summary.totalExpense,
    isProfit,
    fetchTransactions,

  }), [
    transactions,
    loading,
    error,
    filters,
    currentPage,
    summary,
    isProfit,
    fetchTransactions,
  ]);


  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () =>
  useContext(TransactionContext);