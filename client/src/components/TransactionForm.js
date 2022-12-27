import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container } from "@mui/material";

const InitialForm = {
  amount: "",
  description: "",
  date: new Date(),
};

export default function TransactionForm({ fetchTransactions, editTransaction }) {
  const [form, setForm] = useState(InitialForm);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
    console.log(editTransaction);
  }, [editTransaction]);

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  // Sending data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page not reload on submitation

    const res = editTransaction.amount === undefined ? Create() : Update();

    
  };
  const reload=(res)=>{
    if (res.ok) {
      setForm(InitialForm);
      fetchTransactions(); // Refresh everytime when data is added
    }
  }
  const Create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", // send the data in form of application/json
      },
    });
    return reload(res);
  };
  const Update = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", // send the data in form of application/json
      },
    });
    return reload(res);
  };
  return (
    <Container>
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <Typography variant="h6">Add New Transaction</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginRight: 5 }}
              size="small"
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
            <TextField
              sx={{ marginRight: 5 }}
              size="small"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction Date "
                inputFormat="MM/DD/YYYY"
                value={form.date}
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField size="small" sx={{ marginRight: 5 }} {...params} />
                )}
              />
            </LocalizationProvider>
            {editTransaction.amount !== undefined && (
              <Button type="submit" variant="contained">
                Update
              </Button>
            )}
            {editTransaction.amount === undefined && (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
