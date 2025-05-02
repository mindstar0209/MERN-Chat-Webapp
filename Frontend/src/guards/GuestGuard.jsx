import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const GuestGuard = ({ children }) => {
  const [authUser] = useAuth();

  if (authUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default GuestGuard;
