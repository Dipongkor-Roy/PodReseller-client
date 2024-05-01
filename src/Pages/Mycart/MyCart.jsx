
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart"
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const MyCart = () => {
    const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.resale_price + sum, 0); 

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
    return (
        <div>
          <div className="px-5 md:mt-5 h-20 flex justify-between items-center">
        <p className="text-xl bg-orange-300 p-2 mr-3 font-gabarito font-semibold text-white">
          Total Items: {cart.length}
        </p>
        <p className="text-xl mr-3 bg-orange-300 p-2 font-gabarito font-semibold text-white">
          Total Price: ${total}
        </p>
        {cart.length ? (
          <Link to="/dashboard/payment">
            {" "}
            <button className="btn disabled: bg-orange-300 text-xl btn-circle ml-4 font-gabarito font-semibold text-white">
              Pay
            </button>
          </Link>
        ) : (
          <button disabled className="btn bg-orange-400 btn-circle ml-4 font-bricolage-grotesque">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto ">
        <div className="mb-5"></div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-sm">{item.email}</td>
                <td>${item.resale_price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn bg-orange-400 hover:bg-orange-500 btn-sm rounded-md"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
        </div>
    );
};

export default MyCart;