import { Link } from "react-router-dom";
import logo from "../../assets/logo-base-256x256.png";
import { useScrollPosition } from "../../Hooks/useScrollPosition";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useCart from "../../Hooks/useCart";


const Navbar = () => {
const scrollPos=useScrollPosition();
const { user, logOut } = useContext(AuthContext);
const [cart] = useCart();
  const navBarDetails = [
    { path: "/", text: "Home" },
    { path: "/products", text: "Products" },
    { path: "/about", text: "About Us" },
    { path: "/blog", text: "Blog" },
  ];
  const handleLogout = () => {
    logOut().then(() => {
      console.log("Log Out");
    });
  };
  return (
    
      <div
        className={`navbar bg-base-100 h-16 sticky top-0 z-50 transition-shadow  ${
          scrollPos > 0
            ? "shadow bg-opacity-50 backdrop-blur-lg backdrop-filter rounded-lg"
            : "shadow-none"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="p-[12px] lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="shadow-lg menu menu-sm dropdown-content mt-3 z-[1] p-2  bg-base-100 rounded-box w-52"
            >
              {navBarDetails.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>
                    <a className="text-sm font-md">{item.text}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <span className="ml-1">
            {" "}
            <Link to="/">
              <span className="flex items-center">
              <img className="w-10 h-auto" src={logo} alt="Logo" />
              <h2 className="text-xl font-semibold font-gabarito text-orange-500/90">PodReseller</h2>
              </span>
              
            </Link>
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navBarDetails.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>
                  <a className="text-sm font-md">{item.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart?.length || 0}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-44 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cart?.length || 0} Items</span>

                <div className="">
                 <Link to='/dashboard/myCart'>
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
           {user? <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="photo" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to='/dashboard'><a className="justify-between">
                    Dashboard
                    <span className="badge ml-3">New</span>
                  </a></Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </>:<>
           <Link to='/logIn'> <button className="ml-2 btn btn-sm bg-gradient-to-r from-orange-400 to-red-400 bg hover:bg-orange-500 text-white">Log In</button></Link>
            </>}
           
          </div>
        </div>
      </div>

  );
};

export default Navbar;
