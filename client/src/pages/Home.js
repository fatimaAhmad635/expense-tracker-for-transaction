import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import CurrencyConverter from "../components/CurrencyConverter";
import NotificationSystem from "../components/NotificationSystem";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionChart data={transactions} />
      <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} />
      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
      <CurrencyConverter transactions={transactions} />
      <NotificationSystem transactions={transactions} />
    </Container>
  );
}
