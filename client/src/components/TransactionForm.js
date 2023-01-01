import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Container } from "@mui/material";
import {useSelector} from 'react-redux'

const InitialForm = {
  amount: "",
  description: "",
  date: new Date(),
  category_id: "",
};

export default function TransactionForm({ fetchTransactions, editTransaction }) {
  const { categories } = useSelector((state) => state.auth.user);
  const token = Cookies.get("token");
  const [form, setForm] = useState(InitialForm);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  // Sending data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page not reload on submitation

    const res = editTransaction.amount === undefined ? Create() : Update();
  };
  const reload = (res) => {
    if (res.ok) {
      setForm(InitialForm);
      fetchTransactions(); // Refresh everytime when data is added
    }
  };
  const Create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", // send the data in form of application/json
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    });
    return reload(res);
  };
  function getCategoryNameById(){
    return (categories.find((category)=>category._id===form.category_id) ?? "");
  }
  return (
    <Container>
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <Typography variant="h6">Add New Transaction</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{display:'flex'}}>
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
            <Autocomplete
              value={getCategoryNameById()}
              onChange={(event, newValue) => {
                setForm({ ...form, category_id: newValue._id });
              }}
              id="controllable-states-demo"
              options={categories}
              sx={{ width: 300 ,marginRight:5}}
              renderInput={(params) => (
                <TextField {...params} label="Category" size="small" />
              )}
            />
            {editTransaction.amount === undefined && (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            )}
            {editTransaction.amount !== undefined && (
              <Button type="submit" variant="contained">
                Update
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
