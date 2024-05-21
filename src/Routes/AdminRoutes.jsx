/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useContext } from "react";

import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Context/AuthContext";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoadingPending] = useAdmin();
  if (loading || adminLoadingPending) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
