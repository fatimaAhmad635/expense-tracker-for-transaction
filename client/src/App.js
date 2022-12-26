import { useState, useEffect } from "react";
import AppBar  from "./components/AppBar.js";
import TransactionForm from "./components/TransactionForm.js";

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
      <br />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {/* Display Transactions  */}
            {transactions.map((trx)=>(
            <tr key={trx._id}>
              <td>{trx.amount}</td>
              <td>{trx.description}</td>
              <td>{trx.date}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
