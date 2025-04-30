import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthGuard = ({ children }) => {
  const [authUser] = useAuth();

  if (!authUser) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default AuthGuard;
