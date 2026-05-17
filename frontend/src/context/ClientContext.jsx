import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import useApi from "../hooks/useApi";

const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {

  const [clients, setClients] = useState([]);

  const {
    callApi,
    loading,
    error,
  } = useApi();

  // Fetch Clients
  const fetchClients = useCallback(async () => {

    try {

      const res = await callApi({
        method: "GET",
        url: "/clients",
      });

      if (!res) return;

      setClients(res.data || []);

    } catch (err) {
      console.log(err);
    }

  }, [callApi]);



  // Initial Fetch
  useEffect(() => {
    fetchClients();
  }, []);



  // Memoized Value
  const value = useMemo(() => ({
    clients,
    setClients,
    loading,
    error,
    fetchClients,
  }), [
    clients,
    loading,
    error,
    fetchClients,
  ]);


  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () =>
  useContext(ClientContext);