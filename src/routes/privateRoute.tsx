import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { userEmail } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (userEmail) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
