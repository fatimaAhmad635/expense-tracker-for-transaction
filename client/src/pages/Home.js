import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
import Cookies from 'js-cookie'
import TransactionChart from "../components/TransactionChart.js";
const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  // getting data from backend
  const fetchTransactions = async () => {
    const token=Cookies.get('token')
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }); // Default Get request
    const { data } = await res.json();
    setTransactions(data);
  };
  return (
    <>
      <TransactionChart data={transactions}/>
      <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} />
      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
};

export default Home;
