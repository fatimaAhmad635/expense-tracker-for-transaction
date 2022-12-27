import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login'
import Home from './pages/Home'
import reportWebVitals from './reportWebVitals';
import Register from './pages/Register';
import{
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },  
      {
        path:"/login",
        element:<Login/>
      },  
      {
        path:"/register",
        element:<Register/>
      },  
    ],
  },
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
