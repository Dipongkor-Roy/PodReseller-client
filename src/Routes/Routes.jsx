import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import AllProducts from "../Pages/AllProducts/AllProducts";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import Blog from "../Pages/Blog/Blog";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyCart from "../Pages/Mycart/MyCart";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import Payment from "../Pages/Payment/Payment";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AdminHome from "../Pages/AdminHome/AdminHome";
import NotFound from "../Pages/404/NotFound";
import AddProduct from "../Pages/AddProduct/AddProduct";
import SellerProducts from "../Pages/SellerProduct/SellerProducts";
import EditProducts from "../Pages/EditProducts/EditProducts";
import AllProductShow from "../Pages/AllProductShow/AllProductShow";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";

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
        element:<PrivateRoutes> <AllProducts /></PrivateRoutes>,
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
path:'*',
element:<NotFound/>
  },
  {
    path:'dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:"myCart",
        element:<MyCart/>
      },
      {
        path:'allusers',
        element:<AdminRoutes><AllUsers/></AdminRoutes>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory/>
      },
      {
        path:'payment',
        element:<Payment/>
      },
      //admin
      {
        path:'adminHome',
        element:<AdminRoutes><AdminHome/></AdminRoutes>
      },
      
      {
        path:'allProducts',
        element:<AdminRoutes><AllProductShow/></AdminRoutes>
      },
      //seller
      {
        path:"addProduct",
        element:<AddProduct/>
        
      },
      {
        path:'myProducts',
        element:<SellerProducts/>
      },
      {
        path:'updateProduct/:id',
        element:<EditProducts/>
        
       
      }
  
    ]
  }
]);
