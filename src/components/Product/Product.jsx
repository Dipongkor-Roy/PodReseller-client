/* eslint-disable react/prop-types */

import { useContext } from "react";
import { FcApproval } from "react-icons/fc";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const Product = ({ product }) => {
  //  console.log(product)

  const {
    category,
    name,
    _id,
    description,
    image,
    location,
    resale_price,
    years_of_use,
    seller_name,
    verified,
  } = product;
  const {user }=useContext(AuthContext) ;
  const navigate=useLocation(); //todo connect to auth
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  const [,refetch]=useCart();
  const handleAddtoCart = (product) => {
    console.log(product, user);
    if (user && user.email) {
      const productInfo = {
        productItem: _id,
        name,
        image,
        resale_price,
        email: user.email
      };

      fetch('https://pod-reseller-server.vercel.app/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productInfo)
      }).then((res) => res.json()
      ).then((data) => {
        console.log(data)
       if(data.acknowledged){ //important for inserting data to cart
        refetch();
        Toast.fire({
          icon: "success",
          title: "Added To The Cart"
        }); 
       }
       else{
        Swal.fire({
          title: "Please Login To Take Services",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "LogIn!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/logIn",{state:{from: location}});
          }
        });
       }
      });
    } else{
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Please LogIn To Add To Cart",
        icon: "error"
      }).then((result) => {
        // Check if the user clicked "OK"
        if (result.isConfirmed) {
          // Navigate to a different page
          navigate("/logIn");
        }
      });
    }

  };
  return (
    <div className=" lg:w-1/4 md:w-1/2 p-4   w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={image}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {name.slice(0, 20)}
        </h2>
        <h3 className="text-gray-500 text-xs tracking-widest title-font my-1 flex items-center">
          Seller: {seller_name} -{" "}
          <span className="text-[20px]">{verified && <FcApproval />}</span>
        </h3>
        <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">
          Location: {location}
        </h3>
        <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">
          Used: {years_of_use} year{" "}
        </h3>
        <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">
          {description.slice(0, 20)}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <p className="text-md text-[22px] font-semibold ">${resale_price}</p>
          <button
            onClick={() => handleAddtoCart(product)}
            className="btn btn-sm text-gray-500 bg-orange-200 hover:bg-orange-300 border-0"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
