import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import * as React from "react";
import { useSelector } from "react-redux";

// Define the TransactionsList component
export default function TransactionsList({ data, fetchTransctions, setEditTransaction,setCategoryFilter }) {
  // Get the user data from the Redux store
  const user = useSelector((state) => state.auth.user);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleChange = (event,value) => {
    if (value) {
      console.log("Selected value: " + value._id);
      setSelectedCategory(value); // Update local state with selected category
      setCategoryFilter(value._id); // Update filter
    } else {
      console.log("Cleared input");
      setSelectedCategory(null); // Reset local state when cleared
      setCategoryFilter(''); // Reset filter
    }
  };

  // Function to retrieve category name by its ID
  function categoryName(id) {
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : null;
  }
  // Function to remove a transaction
  async function remove(_id) {
    const token = Cookies.get("token");
    if (!window.confirm("Are you sure")) return;

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/transaction/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      fetchTransactions(); // Refresh transactions
      window.alert("Deleted Successfully");
    }
  }

  // Function to format the date in a specific format
  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>

      <Autocomplete
        id="category-filter"
        isOptionEqualToValue={(option, value) => option._id === value._id}
        onChange={handleChange}
        options={user.categories}
        renderInput={(params) => <TextField {...params} label="Category" size="small" />}
        sx={{ float: "right", marginBottom: 2, marginTop: -4, width: 200 }}
        value={selectedCategory}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((month) =>
              month.transactions.map((row) => (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">{`$${row.amount}`}</TableCell>
                  <TableCell align="center">{row.currency}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{categoryName(row.category_id)}</TableCell>
                  <TableCell align="center">{formatDate(row.date)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => remove(row._id)} aria-label="delete" size="large">
                      <DeleteSharpIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditTransaction(row)} aria-label="edit" size="large">
                      <EditSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
