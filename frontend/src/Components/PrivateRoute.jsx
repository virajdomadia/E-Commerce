import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, isAdmin, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {}; // Safely destructure userInfo

  // Check if user is logged in
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // Check if the user is admin (if isAdmin prop is passed)
  if (isAdmin && !userInfo.isAdmin) {
    return <Navigate to="/not-authorized" />;
  }

  // Render the protected component
  return <Component {...rest} />;
};

export default PrivateRoute;
