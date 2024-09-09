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
      <Typography variant="h6">
        {editTransaction && editTransaction._id ? "Update Transaction" : "Add New Transaction"}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <TextField
          fullWidth
          label="Amount"
          margin="normal"
          name="amount"
          onChange={handleChange}
          required
          type="number"
          value={form.amount}
        />

        {/* Description Input */}
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          name="description"
          onChange={handleChange}
          required
          value={form.description}
        />

        {/* Type Selector */}
        <TextField
          fullWidth
          label="Type"
          margin="normal"
          name="type"
          onChange={handleChange}
          required
          select
          value={form.type}
        >
          <MenuItem value="expense">Expense</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="transfer">Transfer</MenuItem>
        </TextField>

        {/* Category Selector */}
        <TextField
          fullWidth
          label="Category ID"
          margin="normal"
          name="category_id"
          onChange={handleChange}
          required
          value={form.category_id}
        />

        {/* Date Input */}
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Date"
          margin="normal"
          name="date"
          onChange={handleChange}
          required
          type="date"
          value={form.date}
        />

        {/* Currency Selector */}
        <TextField
          fullWidth
          label="Currency"
          margin="normal"
          name="currency"
          onChange={handleChange}
          required
          select
          value={form.currency}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.value} value={currency.value}>
              {currency.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit Button */}
        <Button
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
        >
          {editTransaction && editTransaction._id ? "Update Transaction" : "Add Transaction"}
        </Button>
      </form>
    </Box>
  );
}
