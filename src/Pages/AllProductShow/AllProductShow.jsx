import { Link } from "react-router-dom";
import useAllProducts from "../../Hooks/useAllProducts";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllProductShow = () => {

  const products = useAllProducts();
  const [,refetch]=useAllProducts();
 const axiosSecure=useAxiosSecure();
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
        <div>
        <h3 className=" my-5 text-3xl text-center bg-orange-300 rounded-lg font-gabarito font-bold text-white">All Products: {products[0].length}</h3>
        </div>
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
            {products[0].map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="item image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="text-right">${item.resale_price}</td>
                <th>
                  <Link to={`/dashboard/updateProduct/${item._id}`}>
                    <button className="btn  btn-ghost btn-md bg-orange-300 hover:bg-orange-400 rounded-md text-xl text-white">
                      <FaEdit />
                    </button>
                  </Link>
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
  );
};

export default AllProductShow;
