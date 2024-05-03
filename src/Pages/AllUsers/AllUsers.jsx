import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2/src/sweetalert2";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Added As an Admin`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((error) => {
        console.error("Error in Axios request:", error);
      });
  };
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-evenly my-4 ">
        <h2 className="text-2xl font-gabarito font-medium bg-orange-200/70 btn-sm rounded-md">All Users</h2>
        <h2 className="text-2xl font-gabarito font-medium bg-orange-200/70 btn-sm rounded-md">Total Users: {users.length}</h2>
      </div>
      <table className="table table-zebra md:w-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Seller/Buyer</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{user?.name}</td>
              <td className="hidden md:table-cell">{user?.email}</td>
              <td className="md:hidden">{user?.email.slice(0, 4)}</td>
              <td>
                {user?.seller ? (
                  <p className="btn btn-sm bg-red-400/70 text-center font-light rounded-lg">
                    Seller
                  </p>
                ) : (
                  <p className="btn btn-sm bg-orange-200/70 text-center  font-light rounded-lg">
                    Buyer
                  </p>
                )}
              </td>
              <td>
                {user.role === "admin" ? (
                  "Admin"
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-md rounded-md bg-orange-300 hover:bg-orange-400 text-xl text-white"
                  >
                    <FaUser />
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="btn btn-ghost btn-md bg-red-500 rounded-md"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
