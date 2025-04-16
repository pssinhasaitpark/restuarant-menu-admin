import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  // Check if no authToken or userType is invalid (not restaurant_admin or super_admin)
  if (!authToken || (userType !== "restaurant_admin" && userType !== "super_admin")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
