import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, isAdmin, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {}; // Safely destructure userInfo

  // Check if user is logged in and is an admin (if isAdmin prop is passed)
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && !userInfo.isAdmin) {
    return <Navigate to="/login" />; // Redirect non-admin users to login
  }

  // If the user is logged in and is an admin (if applicable), render the protected component
  return <Component {...rest} />;
};

export default PrivateRoute;
