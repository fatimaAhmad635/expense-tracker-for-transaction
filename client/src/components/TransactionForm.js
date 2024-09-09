import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import dayjs from "dayjs";

// Define the available currencies
const currencies = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "PKR", label: "Pakistani Rupee" },
  { value: "INR", label: "Indian Rupee" },
  { value: "JPY", label: "Japanese Yen" },
];

export default function TransactionForm({ fetchTransactions, editTransaction }) {
  // Initialize form state
  const [form, setForm] = useState({
    amount: "",
    description: "",
    type: "expense",
    category_id: "",
    date: dayjs().format("YYYY-MM-DD"),
    currency: "USD", // Default currency
  });

  // Update the form when editTransaction is populated
  useEffect(() => {
    if (editTransaction && Object.keys(editTransaction).length !== 0) {
      setForm({
        ...editTransaction,
        date: dayjs(editTransaction.date).format("YYYY-MM-DD"), // Ensure the date is properly formatted
      });
    }
  }, [editTransaction]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    // If editing an existing transaction, update it; otherwise, create a new one
    const url = editTransaction && editTransaction._id
      ? `${process.env.REACT_APP_BASE_URL}/transaction/${editTransaction._id}`
      : `${process.env.REACT_APP_BASE_URL}/transaction`;

    const method = editTransaction && editTransaction._id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchTransactions(); // Refresh the transaction list
      setForm({
        amount: "",
        description: "",
        type: "expense",
        category_id: "",
        date: dayjs().format("YYYY-MM-DD"),
        currency: "USD", // Reset the form to default values after submission
      });
    }
  };

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      <Typography variant="h6">{editTransaction?._id ? "Edit Transaction" : "Add New Transaction"}</Typography>

      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <TextField
          label="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          fullWidth
          required
          margin="normal"
        />

        {/* Description Input */}
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {/* Type Selector */}
        <TextField
          select
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="expense">Expense</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="transfer">Transfer</MenuItem>
        </TextField>

        {/* Category Selector */}
        <TextField
          label="Category ID"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {/* Date Input */}
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Currency Selector */}
        <TextField
          select
          label="Currency"
          name="currency"
          value={form.currency}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.value} value={currency.value}>
              {currency.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {editTransaction?._id ? "Update Transaction" : "Add Transaction"}
        </Button>
      </form>
    </Box>
  );
}
