import { useState, useEffect } from "react";

const InitialForm={
  amount:"",
  description: "",
  date: "",
}
function App() {

  const [form, setForm] = useState(InitialForm);
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


  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // Sending data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page not reload on submitation
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", // send the data in form of application/json
      },
    });
    const data = await res.json();
    console.log(data);
    if(res.ok){
      setForm(InitialForm)
      fetchTransactions()     // Refresh everytime when data is added
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInput}
          placeholder="Enter transactions amount"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter transactions details"
        />
        <input type="date" name="date" value={form.date} onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>
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
