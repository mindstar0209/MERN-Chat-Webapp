import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const authUser = useSelector((state) => state.auth.user);

  if (!authUser) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default AuthGuard;
