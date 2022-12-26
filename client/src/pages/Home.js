import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  // getting data from backend
  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction"); // Default Get request
    const { data } = await res.json();
    setTransactions(data);
  };
  return (
    <>
      <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} />
      <TransactionsList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
};

export default Home;
