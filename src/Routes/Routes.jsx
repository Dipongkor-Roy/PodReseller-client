import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import AllProducts from "../Pages/AllProducts/AllProducts";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import Blog from "../Pages/Blog/Blog";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyCart from "../Pages/Mycart/MyCart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path:'/signUp',
        element:<SignUp/>
      },
      {
        path:'/blog',
        element:<Blog/>
      }
    ],
   
  },
  {
    path:'dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:"myCart",
        element:<MyCart/>
      }
    ]
  }
]);
