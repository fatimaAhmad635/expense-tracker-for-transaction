import { useState, useEffect } from "react";
import AppBar  from "./components/AppBar.js";
import TransactionForm from "./components/TransactionForm.js";
import TransactionsList from "./components/TransactionsList.js";

function App() {


  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    fetchTransactions();
  }, []);


  // getting data from backend
  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction");   // Default Get request
    const { data } = await res.json();
    setTransactions(data);
  };

  return (
    <>
      <AppBar/>
      <TransactionForm fetchTransactions={fetchTransactions}/>
      <TransactionsList transactions={transactions} fetchTransactions={fetchTransactions}/>
    </>
  );
}

export default App;
