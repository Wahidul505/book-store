import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import Loading from "./Loading";

interface IProp {
  children: ReactNode;
}
const PrivateRoute = ({ children }: IProp) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();
  if (isLoading) {
    return <Loading />;
  }
  if (!user?.email && !isLoading) {
    return <Navigate to={"/sign-in"} state={{ from: location }}></Navigate>;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;
