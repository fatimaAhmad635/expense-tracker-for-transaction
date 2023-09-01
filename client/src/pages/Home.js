// Import necessary modules and libraries from React and your application
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";

// A React component for the Home page
export default function Home() {
  // State to store transaction data and the transaction being edited
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  // Use useEffect to fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to fetch transactions from the server
  async function fetchTransactions() {
    // Retrieve the JWT token from cookies
    const token = Cookies.get("token");

    // Send a request to the server to retrieve transaction data
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the response data and update the state with the transactions
    const { data } = await res.json();
    setTransactions(data);
  }

  // Render the Home page with various components
  return (
    <Container>
      {/* TransactionChart component to display transaction data */}
      <TransactionChart data={transactions} />

      {/* TransactionForm component for adding/editing transactions */}
      <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} />

      {/* TransactionsList component to display a list of transactions */}
      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
