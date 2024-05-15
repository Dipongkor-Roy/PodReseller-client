import { useEffect, useState } from "react";
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import useAuth from '../../Hooks/useAuth'
import { FaEdit,  FaTrashAlt } from "react-icons/fa";
import useAllProducts from "../../Hooks/useAllProducts";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SellerProducts = () => {
const axiosSecure=useAxiosSecure();
const [,refetch]=useAllProducts();
const {user}=useAuth();
const sellerName=user?.name || 'Alex Johnson'; 


    const [products,setProducts]=useState([])
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axiosSecure.get(`/myProducts?sellerName=${sellerName}`);
            setProducts(response.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchProducts();
      }, [sellerName,axiosSecure]);

        const handleDeleteProduct=(item)=>{
            console.log(item);
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async(result) => {
                if (result.isConfirmed) {
          
                  const res=await axiosSecure.delete(`/products/${item._id}`);
                  // console.log(res.data)
                  
                  if(res.data.deletedCount>0){
                    refetch();
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your work has been saved",
                      showConfirmButton: false,
                      timer: 1000
                    });
                  }
                }
              });
        }
    return (
        <div>
            <h3 className=" my-3 text-3xl text-center bg-orange-300 rounded-lg font-gabarito font-bold text-white">{sellerName} Products :</h3>
      <div className="mt-[30px]">
            <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td>
               {index + 1}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="item image"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="text-right">${item.resale_price}</td>
                <th>
                  <Link to={`/dashboard/updateProduct/${item._id}`}><button className="btn  btn-ghost btn-md bg-orange-300 hover:bg-orange-400 rounded-md text-xl text-white">
                    <FaEdit />
                  </button></Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteProduct(item)}
                    className="btn btn-ghost btn-md rounded-md bg-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    </div>
    );
};

export default SellerProducts;