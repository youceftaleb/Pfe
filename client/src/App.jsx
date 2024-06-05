import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import {
  ParentForm,
  PrivateRoute,
  EnseignantForm,
  UsersTable,
  EnseignantInfo,
  Cours,
  Demandes,
  Disponibilite,
  Error,
  ParentDemandes,
} from "./components";
import EnseignantAccountLayout from "./layout/EnseignantAccountLayout";
import Enseignant from "./views/Enseignant";
import FilterPage from "./views/FilterPage";
import AdminLayout from "./layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
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
        errorElement: <Error />,
      },
      {
        path: "parent",
        element: <ParentForm />,
        errorElement: <Error />,
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
        errorElement: <Error />,
      },
      {
        path: "enseignants/:id",
        element: <EnseignantInfo />,
        errorElement: <Error />,
      },
      {
        path: "enseignants/modifier/:id",
        element: <h1>modification page</h1>,
      },
      {
        path: "parents",
        element: <UsersTable />,
        errorElement: <Error />,
      },
      {
        path: "demandes",
        element: <h1 className="text-xl">Demandes</h1>,
        errorElement: <Error />,
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
    errorElement: <Error />,
  },
  {
    path: "/parent/dashboard/demandes",
    element: <ParentDemandes />,
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
        errorElement: <Error />,
      },
      {
        path: "demandes",
        element: <Demandes />,
        errorElement: <Error />,
      },
      {
        path: "disponibilite",
        element: <Disponibilite />,
        errorElement: <Error />,
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
