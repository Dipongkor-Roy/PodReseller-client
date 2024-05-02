import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";




const PaymentHistory = () => {
    const {user}=useAuth();

    const axiosSecure=useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/payments/${user?.email}`);
          return res.data; //pass data 
        },
      });
    return (
        <div>
      <h3>Payment Count: {payments.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>${payment.price}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;