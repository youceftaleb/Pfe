import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children, expect }) => {
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("user_type");
  if (token && type === expect) {
    return children;
  }
  return <Navigate to="/login" />;
};
