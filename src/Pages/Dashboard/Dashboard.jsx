import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaPlusCircle, FaRegEdit, FaShoppingCart, FaUserCheck, FaUsers } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";


const Dashboard = () => {
  // const {user}=useAuth();
  const [isAdmin]=useState(false); //todo: use hook and update\
  const [isSeller]=useState(false); //todo: work with seller
const svg=<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m20 3h-16c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h6 2 8c1.103 0 2-.897 2-2v-14c0-1.103-.897-2-2-2zm-16 16v-12h6v12zm8 0v-12h8v-2l.002 14z"/><path d="m6 10h2v2h-2zm0 4h2v2h-2z"/></svg>
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
       <div className="my-5">
       <Outlet />
       </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button bg-orange-400 hover:bg-orange-500  lg:hidden"
        >
          {svg}
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-orange-400/70 text-base-content">
        
        {isAdmin ? (
    <>
      <Link to='/dashboard/adminHome'><li><a><FaUserCheck />Admin Home</a></li></Link>
      <Link to='/dashboard/addServices'><li><a><FaPlusCircle />Add Services</a></li></Link>
      <Link to='/dashboard/manageServices'><li><a><FaRegEdit />Manage Services</a></li></Link>
      <Link to='/dashboard/allUsers'><li><a><FaUsers /> All Users</a></li></Link>
    </>
  ) : (
    <>
      {isSeller ? (
        <h3>Seller</h3>
      ) : (
        <>
          {/* <li><NavLink to='/dashboard/userHome'><FaHome />User Home</NavLink></li> */}
          <li><NavLink to='/dashboard/paymentHistory'><MdOutlinePayment />Payment History</NavLink></li>
          <li><NavLink to='/dashboard/myCart'><FaShoppingCart />My Orders</NavLink></li>
        </>
      )}
    </>
  )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
