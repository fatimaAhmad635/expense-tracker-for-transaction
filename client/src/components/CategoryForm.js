import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { setUser } from "../store/auth.js";

const InitialForm = {
  label:"",
  icon:"",
};
const icons = ["User"];
export default function CategoryForm({editCategory }) {

  const user= useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
  const token = Cookies.get("token");
  const [form, setForm] = useState(InitialForm);

  useEffect(() => {
    if (editCategory._id !== undefined) {
      setForm(editCategory);
    }
  }, [editCategory]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  // Sending data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page not reload on submitation
    return editCategory._id === undefined ? Create() : Update();
  };


  const reload = (res,_user) => {
    if (res.ok) {
      dispatch(setUser({user:_user}));
      setForm(InitialForm);
    }
  };
  const Create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", // send the data in form of application/json
        Authorization: `Bearer ${token}`,
      },
    });
    const _user={
      ...user,
      categories:[...user.categories,{...form}]
    };
    return reload(res,_user);
  };
  const Update = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${editCategory._id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", // send the data in form of application/json
        Authorization: `Bearer ${token}`,
      },
    });
    const _user={
      ...user,
      categories:[...user.categories,{...form}]
    };
    return reload(res,_user);
  };

  
  function getCategoryNameById() {
    return (user.categories.find((category) => category._id === form.category_id) ?? "");
  }
  return (
    <Container>
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <Typography variant="h6">Add New Category</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
            <TextField
              sx={{ marginRight: 5 }}
              size="small"
              id="outlined-basic"
              label="Label"
              variant="outlined"
              name="label"
              value={form.label}
              onChange={handleChange}
            />

            <Autocomplete
              value={getCategoryNameById()}
              onChange={(event, newValue) => {
                setForm({ ...form, icon: newValue });
              }}
              id="icons"
              options={icons}
              sx={{ width: 200, marginRight: 5 }}
              renderInput={(params) => (
              <TextField {...params}  size="small" label="Icon" />
              )}
            />
            {editCategory._id !== undefined && (
              <Button type="submit" variant="secondary">
                Update
              </Button>
            )}
            {editCategory._id === undefined && (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
