import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import {
  ParentForm,
  PrivateRoute,
  EnseignantForm,
  UsersTable,
  EnseignantInfo,
  Cours,
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
        path: "enseignants/:id",
        element: <EnseignantInfo />,
      },
      {
        path: "enseignants/modifier/:id",
        element: <h1>modification page</h1>,
      },
      {
        path: "parents",
        element: <UsersTable />,
      },
      {
        path: "demandes",
        element: <h1 className="text-xl">Demandes</h1>,
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
    children: [
      {
        path: "cours",
        element: <Cours />,
      },
      {
        path: "demandes",
        element: <h1 className="text-2xl">demandes de cours</h1>,
      },
    ],
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
