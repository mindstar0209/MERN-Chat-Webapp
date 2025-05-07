import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestGuard = ({ children }) => {
  const authUser = useSelector((state) => state.auth.user);

  if (authUser) {
    if (authUser.user?.isActivated === false) {
      return <Navigate to="/profile" />;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default GuestGuard;
