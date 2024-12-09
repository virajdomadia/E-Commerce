import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {}; // Safely destructure userInfo

  return userInfo ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
