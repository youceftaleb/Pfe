import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
};
