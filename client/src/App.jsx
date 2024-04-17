import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import { ParentForm, PrivateRoute, ProfessorForm } from "./components";
import ParentAccountLayout from "./layout/ParentAccountLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>error</div>,
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
        path: "professor",
        element: <ProfessorForm />,
      },
      {
        path: "parent",
        element: <ParentForm />,
      },
    ],
  },
  {
    path: "/parent/dashboard",
    element: (
      <PrivateRoute>
        <ParentAccountLayout />
      </PrivateRoute>
    ),
    errorElement:<h1>parent error</h1>,
    children: [
      {
        path: "",
        element: <h1>dashboard page</h1>,
      },
      {
        path: "page2",
        element: <h1>page 2</h1>,
      },
    ],
  },
]);
function App() {
  return <></>;
}

export default App;
