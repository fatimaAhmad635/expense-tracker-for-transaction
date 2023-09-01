// Import necessary modules and libraries from React and Material-UI
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "../components/CategoryForm.js";
import { setUser } from "../store/auth.js";

// A React component for managing and displaying user categories
export default function Category() {
  // Retrieve the JWT token from cookies
  const token = Cookies.get("token");

  // Retrieve user data and dispatch function from Redux store
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // State to manage the category being edited
  const [editCategory, setEditCategory] = React.useState({});

  // Function to set the category being edited
  function setEdit(category) {
    setEditCategory(category);
  }

  // Function to remove a category
  async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      // Update user data in Redux by removing the deleted category
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id !== id),
      };
      dispatch(setUser({ user: _user }));
    }
  }

  // Render the Category page with category list and form
  return (
    <Container>
      {/* CategoryForm component for adding/editing categories */}
      <CategoryForm editCategory={editCategory} />

      {/* Typography to display the title */}
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Categories
      </Typography>

      {/* TableContainer to display category list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through user's categories and display them in the table */}
            {user.categories.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>
                <TableCell align="center">
                  {/* IconButton for editing the category */}
                  <IconButton color="primary" component="label" onClick={() => setEdit(row)}>
                    <EditSharpIcon />
                  </IconButton>

                  {/* IconButton for deleting the category */}
                  <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
                    <DeleteSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
