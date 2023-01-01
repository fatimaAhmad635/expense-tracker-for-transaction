import AppBar from "./components/AppBar.js";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from "react-router-dom";
import { setUser } from "./store/auth.js";
import Cookies from "js-cookie";
import { Navigate, redirect } from "react-router-dom";
function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true)
  const dispatch=useDispatch();
  const fetchUser = async () => {
    setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.ok){
      const user=await res.json();
      dispatch(setUser(user));
    }
    setIsLoading(false)

  };
  useEffect(() => {
    fetchUser()
  }, [])
  if(isLoading){
    return <p>Loading...</p>
  }
  console.log("logg");
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
