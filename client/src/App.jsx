import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import {
  ParentForm,
  PrivateRoute,
  EnseignantForm,
  UsersTable,
} from "./components";
import EnseignantAccountLayout from "./layout/EnseignantAccountLayout";
import Enseignant from "./views/Enseignant";
import FilterPage from "./views/FilterPage";
import AdminLayout from "./layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Home error</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
    children: [
      {
        path: "",
        element: <></>,
      },
      {
        path: "enseignant",
        element: <EnseignantForm />,
      },
      {
        path: "parent",
        element: <ParentForm />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute expect="admin">
        <AdminLayout />
      </PrivateRoute>
    ),
    errorElement: <div>dashboard error</div>,
    children: [
      {
        path: "enseignants",
        element: <UsersTable />,
      },
      {
        path: "parents",
        element: <UsersTable />,
      },
    ],
  },
  {
    path: "/parent/dashboard",
    element: (
      <PrivateRoute expect="parent">
        <FilterPage />
      </PrivateRoute>
    ),
    errorElement: <div>dashboard error</div>,
  },
  {
    path: "/enseignant/dashboard",
    element: (
      <PrivateRoute expect="enseignant">
        <EnseignantAccountLayout />
      </PrivateRoute>
    ),
  },
  {
    path: "/enseignant/:id",
    element: <Enseignant />,
  },
]);
function App() {
  return <></>;
}

export default App;
